"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <Button className="mt-4" onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
