import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/admin-auth";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  rateLimit.set(ip, entry);
  return false;
}

function calculateLeadScore(fields: Record<string, unknown>) {
  let score = 10;
  const message = String(fields.message || "");
  if (fields.phone) score += 5;
  if (fields.company) score += 5;
  if (fields.budget) score += 10;
  if (fields.service_interest) score += 5;
  if (message.length > 120) score += 10;
  if (message.length > 300) score += 10;
  return Math.min(score, 100);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const fields = body?.fields || {};

    if (fields.website) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    const name = String(fields.name || "").trim();
    const email = String(fields.email || "").trim();
    const message = String(fields.message || "").trim();
    const consent = Boolean(fields.consent_to_contact);

    if (name.length < 2 || !isValidEmail(email) || message.length < 10 || !consent) {
      return NextResponse.json({ error: "Invalid lead data" }, { status: 400 });
    }

    if (message.length > 4000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const leadScore = calculateLeadScore(fields);
    const db = getAdminDb();

    const payload = {
      createdAt: FieldValue.serverTimestamp(),
      page_path: body?.page_path || null,
      form_id: body?.form_id || "contact_form",
      lead_type: body?.lead_type || "contact",
      status: "new",
      leadScore,
      fields: {
        name,
        email,
        phone: fields.phone || null,
        company: fields.company || null,
        budget: fields.budget || null,
        service_interest: fields.service_interest || null,
        message,
        consent_to_contact: consent,
      },
      attribution: body?.attribution || null,
      userAgent: request.headers.get("user-agent") || "unknown",
      ip,
    };

    const doc = await db.collection("leads").add(payload);

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await verifyAdmin(token);

    const db = getAdminDb();
    const snapshot = await db
      .collection("leads")
      .orderBy("createdAt", "desc")
      .limit(200)
      .get();

    const leads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}
