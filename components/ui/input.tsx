import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("h-10 w-full rounded-xl border border-white/20 bg-slate-950/40 px-3 text-sm outline-none focus:ring-2 focus:ring-sky-500", props.className)} />;
}
