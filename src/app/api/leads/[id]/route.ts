import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/admin-auth";

const ALLOWED_STATUS = new Set(["new", "contacted", "won", "lost"]);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await verifyAdmin(token);

    const body = await request.json();
    const status = String(body?.status || "");

    if (!ALLOWED_STATUS.has(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const { id } = await params;
    const db = getAdminDb();
    await db.collection("leads").doc(id).update({ status });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
