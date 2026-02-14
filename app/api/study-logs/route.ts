import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type Payload = {
  subject?: string;
  duration?: number;
  date?: string;
  notes?: string;
  mood?: "focused" | "average" | "tired";
};

export async function GET() {
  const logs = await prisma.studyLog.findMany({
    orderBy: { date: "desc" },
    take: 100,
  });

  return NextResponse.json(logs);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Payload;

  if (!payload.subject?.trim()) {
    return NextResponse.json({ error: "Subject is required" }, { status: 400 });
  }

  const log = await prisma.studyLog.create({
    data: {
      subject: payload.subject.trim(),
      duration: Math.min(720, Math.max(5, Number(payload.duration ?? 25))),
      notes: payload.notes?.trim() ?? "",
      mood: payload.mood ?? "focused",
      date: payload.date ? new Date(payload.date) : new Date(),
    },
  });

  return NextResponse.json(log, { status: 201 });
}
