import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type Payload = {
  subject?: string;
  duration?: number;
  date?: string;
  notes?: string;
  mood?: "focused" | "average" | "tired";
};

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const payload = (await request.json()) as Payload;

  const updates: Record<string, unknown> = {};
  if (payload.subject !== undefined) updates.subject = payload.subject.trim();
  if (payload.duration !== undefined) updates.duration = Math.min(720, Math.max(5, Number(payload.duration)));
  if (payload.notes !== undefined) updates.notes = payload.notes;
  if (payload.mood !== undefined) updates.mood = payload.mood;
  if (payload.date !== undefined) updates.date = new Date(payload.date);

  try {
    const updated = await prisma.studyLog.update({ where: { id: params.id }, data: updates });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Study log not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.studyLog.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Study log not found" }, { status: 404 });
  }
}
