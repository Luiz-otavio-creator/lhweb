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

    const [landingPages] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    const [sources] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    const [campaigns] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionCampaignName" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    const [devices] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    return NextResponse.json({
      landingPages: landingPages.rows?.map((row) => ({
        pagePath: row.dimensionValues?.[0]?.value,
        sessions: Number(row.metricValues?.[0]?.value || 0),
      })) || [],
      sources: sources.rows?.map((row) => ({
        source: row.dimensionValues?.[0]?.value,
        medium: row.dimensionValues?.[1]?.value,
        sessions: Number(row.metricValues?.[0]?.value || 0),
      })) || [],
      campaigns: campaigns.rows?.map((row) => ({
        campaign: row.dimensionValues?.[0]?.value,
        sessions: Number(row.metricValues?.[0]?.value || 0),
      })) || [],
      devices: devices.rows?.map((row) => ({
        device: row.dimensionValues?.[0]?.value,
        sessions: Number(row.metricValues?.[0]?.value || 0),
      })) || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
