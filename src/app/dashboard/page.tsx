"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAdminAuth } from "@/components/dashboard/useAdminAuth";

type OverviewData = {
  users: number;
  newUsers: number;
  sessions: number;
  engagedSessions: number;
  leadSubmits: number;
  leadsLast7Days: number;
  leadsLast30Days: number;
};

type Lead = {
  id: string;
  createdAt?: { _seconds?: number; seconds?: number };
  status?: string;
  leadScore?: number;
  lead_type?: string;
  form_id?: string;
  page_path?: string;
  fields?: Record<string, string | boolean | null>;
  attribution?: Record<string, string | number | null>;
};

type TrafficData = {
  landingPages: { pagePath: string; sessions: number }[];
  sources: { source: string; medium: string; sessions: number }[];
  campaigns: { campaign: string; sessions: number }[];
  devices: { device: string; sessions: number }[];
};

type EventData = {
  events: { event: string; count: number }[];
};

const STATUS_OPTIONS = ["new", "contacted", "won", "lost"];

export default function DashboardPage() {
  const { user, loading, isAdmin, token, login, logout } = useAdminAuth();
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [traffic, setTraffic] = useState<TrafficData | null>(null);
  const [events, setEvents] = useState<EventData | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!token || !isAdmin) return;

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("/api/analytics/overview", { headers }),
      fetch("/api/analytics/traffic", { headers }),
      fetch("/api/analytics/events", { headers }),
      fetch("/api/leads", { headers }),
    ]).then(async ([overviewRes, trafficRes, eventsRes, leadsRes]) => {
      if (overviewRes.ok) setOverview(await overviewRes.json());
      if (trafficRes.ok) setTraffic(await trafficRes.json());
      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
      }
    });
  }, [token, isAdmin]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const statusOk = statusFilter === "all" || lead.status === statusFilter;
      const searchValue = search.trim().toLowerCase();
      if (!searchValue) return statusOk;
      const name = String(lead.fields?.name || "").toLowerCase();
      const email = String(lead.fields?.email || "").toLowerCase();
      return statusOk && (name.includes(searchValue) || email.includes(searchValue));
    });
  }, [leads, statusFilter, search]);

  const conversionRate = useMemo(() => {
    if (!overview?.sessions) return 0;
    return Math.round(((overview.leadSubmits || 0) / overview.sessions) * 1000) / 10;
  }, [overview]);

  const handleStatusChange = async (leadId: string, status: string) => {
    if (!token) return;
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)));
  };

  if (loading) {
    return <div className="min-h-screen bg-[#050816] text-white p-10">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050816] text-white p-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold">Admin dashboard</h1>
          <p className="mt-2 text-sm text-white/70">
            Sign in with an admin account to access analytics and leads.
          </p>
          <Button onClick={login} className="mt-6 rounded-2xl bg-[#5ef2ff] text-[#050914]">
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050816] text-white p-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold">Access denied</h1>
          <p className="mt-2 text-sm text-white/70">
            Your account is not authorized for this dashboard.
          </p>
          <Button onClick={logout} className="mt-6 rounded-2xl bg-white/10 text-white">
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">LHWEB Analytics</h1>
            <p className="text-sm text-white/60">Signed in as {user.email}</p>
          </div>
          <div className="relative flex items-center gap-3">
            <div className="hidden flex-wrap items-center gap-3 md:flex">
              <Button
                onClick={() => (window.location.href = "/dashboard/content/home")}
                className="rounded-2xl bg-[#5ef2ff] text-[#050914]"
              >
                Edit Home
              </Button>
              <Button onClick={logout} className="rounded-2xl bg-white/10 text-white">
                Sign out
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {menuOpen ? (
              <div className="absolute right-0 top-12 z-20 w-48 rounded-2xl border border-white/10 bg-[#0c1021] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] md:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/dashboard/content/home";
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  Edit Home
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Sessions (30d)" value={overview?.sessions ?? 0} />
          <StatCard label="Users (30d)" value={overview?.users ?? 0} />
          <StatCard label="Leads (30d)" value={overview?.leadsLast30Days ?? 0} />
          <StatCard label="Conversion" value={`${conversionRate}%`} />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Top Landing Pages</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={traffic?.landingPages || []} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                  <YAxis type="category" dataKey="pagePath" stroke="rgba(255,255,255,0.5)" width={140} />
                  <Tooltip contentStyle={{ background: "#0c1021", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Bar dataKey="sessions" fill="#5ef2ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Top Sources</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {(traffic?.sources || []).map((source) => (
                <li key={`${source.source}-${source.medium}`} className="flex items-center justify-between">
                  <span>
                    {source.source} / {source.medium}
                  </span>
                  <span className="text-white/90">{source.sessions}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Top Campaigns</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={traffic?.campaigns || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="campaign" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ background: "#0c1021", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Line type="monotone" dataKey="sessions" stroke="#8f5eff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Top Events</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {(events?.events || []).map((event) => (
                <li key={event.event} className="flex items-center justify-between">
                  <span>{event.event}</span>
                  <span className="text-white/90">{event.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Leads</h2>
              <p className="text-sm text-white/60">Filter and manage lead status.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name/email"
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="all">All statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 overflow-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-white/60">
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Service</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-white/10">
                    <td className="py-3">{String(lead.fields?.name || "—")}</td>
                    <td className="py-3">{String(lead.fields?.email || "—")}</td>
                    <td className="py-3">{String(lead.fields?.service_interest || "—")}</td>
                    <td className="py-3">
                      <Badge className="border-white/10 bg-white/5 text-white/80">
                        {lead.leadScore ?? 0}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <select
                        value={lead.status || "new"}
                        onChange={(event) => handleStatusChange(lead.id, event.target.value)}
                        className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-xs uppercase tracking-[0.24em] text-white/50">
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}
