import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => <Card key={i} className="h-28 animate-pulse" />)}
    </div>
  );
}
