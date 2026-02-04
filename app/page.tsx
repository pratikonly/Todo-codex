"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const glassCard =
  "rounded-3xl border border-[var(--card-border)] bg-[var(--card)] shadow-[var(--shadow)] backdrop-blur-xl";

export default function HomePage() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className={`${glassCard} flex flex-col gap-6 p-8 sm:p-10`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Daily overview
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Good morning, you have a focused day ahead.
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
                Balance today&apos;s priorities, preview what&apos;s next, and keep an eye on
                completed tasks. Toggle the theme to shift the mood of your workspace.
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-white/40 px-5 py-2 text-sm font-semibold text-[var(--text)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/60 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <span className="text-lg">🌗</span>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
          </div>
          <div className="grid gap-4 text-sm text-[var(--muted)] sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-4 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em]">Focus</p>
              <p className="mt-2 text-xl font-semibold text-[var(--text)]">3 deep work blocks</p>
              <p className="mt-1">Schedule two 90-minute sessions.</p>
            </div>
            <div className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-4 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em]">Energy</p>
              <p className="mt-2 text-xl font-semibold text-[var(--text)]">Balanced pace</p>
              <p className="mt-1">Plan breaks between meetings.</p>
            </div>
            <div className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-4 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em]">Progress</p>
              <p className="mt-2 text-xl font-semibold text-[var(--text)]">7 tasks in motion</p>
              <p className="mt-1">Stay consistent with your flow.</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Today</h2>
              <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                3 tasks
              </span>
            </div>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                "Design the daily highlight card",
                "Ship the glassmorphism layout",
                "Review sprint objectives",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[var(--card-border)] bg-white/40 p-4 text-[var(--text)] shadow-sm backdrop-blur-md dark:bg-white/10"
                >
                  <p className="font-medium">{item}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    Focus block
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming</h2>
              <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                Next 7 days
              </span>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              {[
                { title: "Client kickoff", meta: "Tomorrow · 10:00 AM" },
                { title: "Prototype review", meta: "Wed · Design team" },
                { title: "Launch checklist", meta: "Fri · Final polish" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--card-border)] bg-white/40 p-4 text-[var(--text)] shadow-sm backdrop-blur-md dark:bg-white/10"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {item.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Completed</h2>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                12 done
              </span>
            </div>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                "Finalize Q2 roadmap",
                "Organize design assets",
                "Sync with marketing",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[var(--card-border)] bg-white/40 p-4 text-[var(--text)] shadow-sm backdrop-blur-md dark:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Done
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
