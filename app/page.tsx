export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        Next.js App Router
      </p>
      <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
        Todo Codex Starter
      </h1>
      <p className="max-w-xl text-base text-slate-600">
        Edit <code className="rounded bg-slate-100 px-2 py-1">app/page.tsx</code> to get
        started building your next idea.
      </p>
    </main>
  );
}
