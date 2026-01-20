import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/admin-auth";

const HOME_DOC_PATH = "content/pages/home/page";

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) throw new Error("Unauthorized");
  await verifyAdmin(token);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const doc = await getAdminDb().doc(HOME_DOC_PATH).get();
    return NextResponse.json({ content: doc.data() || null });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request);
    const body = await request.json();

    await getAdminDb()
      .doc(HOME_DOC_PATH)
      .set({ ...body, updatedAt: FieldValue.serverTimestamp() }, { merge: true });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}
