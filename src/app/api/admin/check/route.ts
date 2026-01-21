import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/firebase/admin-auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    await verifyAdmin(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
