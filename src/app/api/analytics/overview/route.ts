import { NextRequest, NextResponse } from "next/server";
import { getGa4Client, getGa4Property } from "@/lib/analytics/ga4";
import { getAdminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/admin-auth";

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) throw new Error("Unauthorized");
  await verifyAdmin(token);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const client = getGa4Client();
    const property = getGa4Property();

    const [report] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "sessions" },
        { name: "engagedSessions" },
      ],
    });

    const [leadReport] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { value: "lead_submit" },
        },
      },
    });

    const metrics = report?.rows?.[0]?.metricValues || [];
    const leadMetrics = leadReport?.rows?.[0]?.metricValues || [];

    const db = getAdminDb();
    const now = Date.now();
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const [leads7, leads30] = await Promise.all([
      db.collection("leads").where("createdAt", ">=", sevenDaysAgo).get(),
      db.collection("leads").where("createdAt", ">=", thirtyDaysAgo).get(),
    ]);

    return NextResponse.json({
      users: Number(metrics[0]?.value || 0),
      newUsers: Number(metrics[1]?.value || 0),
      sessions: Number(metrics[2]?.value || 0),
      engagedSessions: Number(metrics[3]?.value || 0),
      leadSubmits: Number(leadMetrics[0]?.value || 0),
      leadsLast7Days: leads7.size,
      leadsLast30Days: leads30.size,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
