import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-2xl p-8 text-center">
        <h1 className="text-5xl font-bold">EduPilot</h1>
        <p className="mt-3 text-lg text-slate-300">Navigate Your Learning Journey</p>
        <p className="mt-5 text-sm text-slate-300">Enterprise-grade student productivity platform with analytics, AI planning, leaderboards, and resilient study workflows.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/auth"><Button>Get Started</Button></Link>
          <Link href="/dashboard"><Button variant="outline">Open Demo Dashboard</Button></Link>
        </div>
      </Card>
    </main>
  );
}
