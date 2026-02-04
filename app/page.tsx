"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type TaskStatus = "todo" | "in-progress" | "blocked" | "done";
type TaskPriority = "low" | "medium" | "high";

type Task = {
  title: string;
  description: string;
  tags: string[];
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
};

const glassCard =
  "rounded-3xl border border-[var(--card-border)] bg-[var(--card)] shadow-[var(--shadow)] backdrop-blur-xl";

const tasks: Task[] = [
  {
    title: "Refine onboarding flow",
    description: "Audit the first-time experience and tighten the copy.",
    tags: ["design", "growth"],
    priority: "high",
    dueDate: "2024-07-22",
    status: "in-progress",
    createdAt: "2024-07-10",
  },
  {
    title: "QA weekly release",
    description: "Run regression and document any high-impact issues.",
    tags: ["qa", "release"],
    priority: "medium",
    dueDate: "2024-07-18",
    status: "blocked",
    createdAt: "2024-07-08",
  },
  {
    title: "Draft roadmap update",
    description: "Align with leadership on Q3 priorities and risks.",
    tags: ["strategy"],
    priority: "high",
    dueDate: "2024-07-25",
    status: "todo",
    createdAt: "2024-07-09",
  },
  {
    title: "Customer follow-up summaries",
    description: "Send recap notes and capture next-step owners.",
    tags: ["customer", "ops"],
    priority: "low",
    dueDate: "2024-07-16",
    status: "done",
    createdAt: "2024-07-05",
  },
  {
    title: "Sync with marketing",
    description: "Confirm launch dates for the new campaign pages.",
    tags: ["marketing"],
    priority: "medium",
    dueDate: "2024-07-20",
    status: "in-progress",
    createdAt: "2024-07-07",
  },
  {
    title: "Prototype usability test",
    description: "Recruit 5 users and schedule the moderated session.",
    tags: ["research", "design"],
    priority: "medium",
    dueDate: "2024-07-19",
    status: "todo",
    createdAt: "2024-07-06",
  },
];

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  blocked: "Blocked",
  done: "Done",
};

const focusCards = [
  {
    title: "Priority radar",
    description: "Three high-impact tasks need attention within 72 hours.",
    tone: "from-rose-500/15 via-rose-500/10 to-transparent text-rose-600 dark:text-rose-300",
  },
  {
    title: "Energy plan",
    description: "Schedule deep work before 2 PM to clear the blockers.",
    tone: "from-sky-500/15 via-sky-500/10 to-transparent text-sky-600 dark:text-sky-300",
  },
  {
    title: "Momentum streak",
    description: "You have completed 4 tasks in a row since Monday.",
    tone: "from-emerald-500/15 via-emerald-500/10 to-transparent text-emerald-600 dark:text-emerald-300",
  },
];

export default function HomePage() {
  const [theme, setTheme] = useState<Theme>("light");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter !== "all" && task.status !== statusFilter) {
        return false;
      }
      if (priorityFilter !== "all" && task.priority !== priorityFilter) {
        return false;
      }
      if (tagFilter !== "all" && !task.tags.includes(tagFilter)) {
        return false;
      }
      return true;
    });
  }, [priorityFilter, statusFilter, tagFilter]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);
  const activeTasks = tasks.filter((task) => task.status === "in-progress").length;
  const blockedTasks = tasks.filter((task) => task.status === "blocked").length;
  const uniqueTags = Array.from(new Set(tasks.flatMap((task) => task.tags)));
  const upcomingTasks = [...tasks]
    .filter((task) => task.status !== "done")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

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
                Nimbus keeps your work calm, clear, and in motion.
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
          <div className="grid gap-4 text-sm text-[var(--muted)] lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-5 dark:bg-white/5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">Task completion</p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--text)]">
                    {completedTasks} of {totalTasks} tasks done
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                  {progressPercent}% complete
                </span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/40 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em]">
                <span className="rounded-full bg-white/40 px-3 py-1 dark:bg-white/10">
                  Active: {activeTasks}
                </span>
                <span className="rounded-full bg-white/40 px-3 py-1 dark:bg-white/10">
                  Blocked: {blockedTasks}
                </span>
                <span className="rounded-full bg-white/40 px-3 py-1 dark:bg-white/10">
                  Due this week: 3
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-5 text-xs uppercase tracking-[0.2em] text-[var(--muted)] dark:bg-white/5">
              <p>Dashboard</p>
              <p className="mt-3 text-2xl font-semibold normal-case text-[var(--text)]">
                Momentum is steady
              </p>
              <p className="mt-3 normal-case text-[var(--muted)]">
                Review priorities, adjust filters, and keep the critical items moving forward.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className={`${glassCard} p-6 sm:p-8`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                  Smart focus
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Signals tuned for today</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Personalized nudges surface what matters most. Use them to plan a calmer,
                  more intentional day.
                </p>
              </div>
              <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                Auto insights
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {focusCards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-2xl border border-[var(--card-border)] bg-gradient-to-br ${card.tone} px-4 py-5 text-sm`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {card.title}
                  </p>
                  <p className="mt-3 text-sm font-medium text-[var(--text)]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${glassCard} flex flex-col gap-5 p-6 sm:p-8`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Track ahead
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Upcoming checkpoints</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Stay aligned with what&apos;s due next and keep the schedule balanced.
              </p>
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-2xl border border-[var(--card-border)] bg-white/40 p-4 text-sm dark:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--text)]">{task.title}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{task.description}</p>
                    </div>
                    <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-semibold text-[var(--text)] dark:bg-white/10">
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-auto rounded-full border border-[var(--card-border)] bg-white/40 px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-white/60 dark:bg-white/10 dark:hover:bg-white/20"
            >
              Open timeline
            </button>
          </div>
        </section>

        <section className={`${glassCard} p-6 sm:p-8`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Task list</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Filter by status, tag, or priority to focus the team&apos;s attention.
              </p>
            </div>
            <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
              Showing {filteredTasks.length} of {totalTasks}
            </span>
          </div>

          <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            <label className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-4 dark:bg-white/5">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Status</span>
              <select
                className="mt-2 w-full rounded-xl border border-[var(--card-border)] bg-white/60 px-3 py-2 text-sm text-[var(--text)] dark:bg-white/10"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as TaskStatus | "all")}
              >
                <option value="all">All statuses</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-4 dark:bg-white/5">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Tags</span>
              <select
                className="mt-2 w-full rounded-xl border border-[var(--card-border)] bg-white/60 px-3 py-2 text-sm text-[var(--text)] dark:bg-white/10"
                value={tagFilter}
                onChange={(event) => setTagFilter(event.target.value)}
              >
                <option value="all">All tags</option>
                {uniqueTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
            <label className="rounded-2xl border border-[var(--card-border)] bg-white/30 p-4 dark:bg-white/5">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Priority</span>
              <select
                className="mt-2 w-full rounded-xl border border-[var(--card-border)] bg-white/60 px-3 py-2 text-sm text-[var(--text)] dark:bg-white/10"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value as TaskPriority | "all")
                }
              >
                <option value="all">All priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {filteredTasks.map((task) => (
              <article
                key={task.title}
                className="rounded-2xl border border-[var(--card-border)] bg-white/40 p-5 text-[var(--text)] shadow-sm backdrop-blur-md dark:bg-white/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{task.description}</p>
                  </div>
                  <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    {statusLabels[task.status]}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  <span className="rounded-full bg-white/40 px-3 py-1 dark:bg-white/10">
                    Priority: {task.priority}
                  </span>
                  <span className="rounded-full bg-white/40 px-3 py-1 dark:bg-white/10">
                    Due {task.dueDate}
                  </span>
                  <span className="rounded-full bg-white/40 px-3 py-1 dark:bg-white/10">
                    Created {task.createdAt}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--card-border)] bg-white/60 px-3 py-1 text-xs font-semibold text-[var(--text)] dark:bg-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-[var(--card-border)] bg-white/20 p-8 text-center text-sm text-[var(--muted)] dark:bg-white/5">
              No tasks match these filters. Try adjusting the criteria.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
