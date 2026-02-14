"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/study-tracker", label: "Study Tracker" },
  { href: "/analytics", label: "Analytics" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/ai-planner", label: "AI Planner" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "https://pratik.dev";

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl gap-4 rounded-[2rem] border border-white/15 bg-slate-900/70 p-3 shadow-2xl backdrop-blur-xl md:p-6">
        <aside className="hidden w-56 shrink-0 flex-col gap-2 rounded-3xl border border-white/15 bg-slate-900/70 p-3 lg:flex">
          <div className="mb-4 px-2 text-xl font-semibold">EduPilot</div>
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={cn("rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/10", pathname === href && "bg-sky-500/30 text-white")}>
              {label}
            </Link>
          ))}
        </aside>
        <section className="flex-1">
          <header className="glass sticky top-2 z-20 mb-4 flex items-center justify-between rounded-2xl px-4 py-3">
            <div><p className="font-semibold">EduPilot</p><p className="text-xs text-slate-300">Navigate Your Learning Journey</p></div>
            <div className="hidden w-1/3 md:block"><Input placeholder="Search sessions, goals, notes..." /></div>
            <div className="flex items-center gap-2"><Button variant="ghost" size="icon">🔔</Button><Button variant="outline" size="sm">Quick Focus</Button></div>
          </header>
          {children}
          <footer className="mt-4">
            <Card className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Built for high performance study teams.</p>
              <a href={portfolioUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">Made by Pratik</a>
            </Card>
          </footer>
        </section>
      </div>
      <nav className="glass fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2 rounded-2xl p-2 lg:hidden">
        {navItems.slice(0, 5).map(({ href, label }) => <Link key={href} href={href} className={cn("rounded-xl px-3 py-2 text-xs", pathname === href && "bg-sky-500/40")}>{label}</Link>)}
      </nav>
    </main>
  );
}
