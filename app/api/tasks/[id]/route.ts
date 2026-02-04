import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";

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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const updates: Record<string, unknown> = {};

  if (typeof body.title === "string") {
    updates.title = body.title.trim();
  }
  if (typeof body.description === "string") {
    updates.description = body.description.trim();
  }
  if (Array.isArray(body.tags)) {
    updates.tags = body.tags.map((tag: string) => tag.trim()).filter(Boolean);
  }
  if (typeof body.priority === "string") {
    updates.priority = body.priority;
  }
  if (typeof body.status === "string") {
    updates.status = body.status;
  }
  if (body.dueDate) {
    updates.dueDate = new Date(body.dueDate);
  }

  try {
    const task = await prisma.task.update({
      where: { id: params.id },
      data: updates,
    });
    return NextResponse.json(serializeTask(task));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }
}
