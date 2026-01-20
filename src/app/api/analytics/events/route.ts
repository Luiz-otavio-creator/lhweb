import { NextRequest, NextResponse } from "next/server";
import { getGa4Client, getGa4Property } from "@/lib/analytics/ga4";
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

    const [events] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 15,
    });

    return NextResponse.json({
      events: events.rows?.map((row) => ({
        event: row.dimensionValues?.[0]?.value,
        count: Number(row.metricValues?.[0]?.value || 0),
      })) || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
