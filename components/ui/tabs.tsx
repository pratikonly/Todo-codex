"use client";

import { cn } from "@/lib/utils";

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex rounded-xl bg-white/10 p-1", className)} {...props} />;
}

export function TabsTrigger({ active, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return <button className={cn("rounded-lg px-3 py-1.5 text-sm", active ? "bg-sky-500 text-white" : "text-slate-300")} {...props} />;
}
