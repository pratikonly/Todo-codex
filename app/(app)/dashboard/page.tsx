"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const points = [3, 4, 2, 5, 4, 3, 4];

export default function DashboardPage() {
  const [range, setRange] = useState("week");

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Daily Study Time", "4h 20m", "+18% vs yesterday"],
            ["Current Streak", "12 days", "Best: 27 days"],
            ["Productivity Score", "86/100", "Top 9% globally"],
          ].map(([title, value, sub]) => (
            <Card key={title} className="transition hover:-translate-y-1"><p className="text-sm text-slate-300">{title}</p><h3 className="mt-1 text-2xl font-semibold">{value}</h3><p className="text-xs text-emerald-300">{sub}</p></Card>
          ))}
        </div>

        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Study Analytics</h2>
            <div className="flex gap-2">
              <TabsList>{["day", "week", "month", "year"].map((r) => <TabsTrigger key={r} active={range === r} onClick={() => setRange(r)}>{r}</TabsTrigger>)}</TabsList>
              <Button variant="outline" size="sm">Filter</Button><Button size="sm">Export</Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 p-4">
            <p className="mb-2 text-sm text-slate-300">Focus session trend ({range})</p>
            <div className="flex h-48 items-end gap-3">
              {points.map((p, i) => <div key={i} className="w-full rounded-t bg-sky-400/60" style={{ height: `${p * 18}%` }} />)}
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-4">
          {["Recent Activity", "Study History", "Notes", "Goals"].map((title) => <Card key={title} className="max-h-36 overflow-y-auto"><h3 className="mb-2 font-semibold">{title}</h3><p className="text-sm text-slate-300">Scrollable compact widget panel with modular card content.</p></Card>)}
        </div>
      </div>
      <aside className="space-y-4">
        <Card><h3 className="font-semibold">Profile Preview</h3><p className="text-sm text-slate-300">Aarav Patel · B.Tech CSE</p></Card>
        <Card><h3 className="mb-2 font-semibold">Upcoming Tasks</h3><ul className="space-y-1 text-sm text-slate-300"><li>DSA mock test</li><li>Physics assignment</li></ul></Card>
        <Card><h3 className="mb-2 font-semibold">AI Tips</h3><p className="text-sm text-slate-300">Switch to review mode after 7 PM for memory consolidation.</p></Card>
      </aside>
    </div>
  );
}
