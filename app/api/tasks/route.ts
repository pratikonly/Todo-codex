import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

const serializeTask = (task: {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priority: string;
  status: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  ...task,
  dueDate: task.dueDate.toISOString(),
  createdAt: task.createdAt.toISOString(),
  updatedAt: task.updatedAt.toISOString(),
});

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks.map(serializeTask));
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const description = typeof body.description === "string" ? body.description.trim() : "";
  const tags = Array.isArray(body.tags)
    ? body.tags.map((tag: string) => tag.trim()).filter(Boolean)
    : [];
  const priority = body.priority ?? "medium";
  const status = body.status ?? "todo";
  const dueDate = body.dueDate ? new Date(body.dueDate) : new Date();

  const task = await prisma.task.create({
    data: {
      title,
      description,
      tags,
      priority,
      status,
      dueDate,
    },
  });

  return NextResponse.json(serializeTask(task), { status: 201 });
}
