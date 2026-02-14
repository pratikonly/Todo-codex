"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type StudyLog = {
  id: string;
  subject: string;
  duration: number;
  mood: string;
  notes: string;
  date: string;
};

export default function StudyTrackerPage() {
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(25);
  const [mood, setMood] = useState("focused");
  const [notes, setNotes] = useState("");
  const [seconds, setSeconds] = useState(1500);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem("edu-draft");
    if (cached) {
      const parsed = JSON.parse(cached) as {
        subject: string;
        duration: number;
        mood: string;
        notes: string;
      };
      setSubject(parsed.subject);
      setDuration(parsed.duration);
      setMood(parsed.mood);
      setNotes(parsed.notes);
    }
    fetchLogs();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "edu-draft",
      JSON.stringify({ subject, duration, mood, notes })
    );
  }, [subject, duration, mood, notes]);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchLogs = async () => {
    const res = await fetch("/api/study-logs");
    if (res.ok) setLogs(await res.json());
  };

  const clearForm = () => {
    setSubject("");
    setDuration(25);
    setMood("focused");
    setNotes("");
    setEditingId(null);
  };

  const saveLog = async () => {
    const payload = { subject, duration, mood, notes, date: new Date().toISOString() };
    const url = editingId ? `/api/study-logs/${editingId}` : "/api/study-logs";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      clearForm();
      fetchLogs();
    }
  };

  const deleteLog = async (id: string) => {
    const res = await fetch(`/api/study-logs/${id}`, { method: "DELETE" });
    if (res.ok) fetchLogs();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Study Session Management</h2>
        <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        <Input placeholder="Mood (focused / average / tired)" value={mood} onChange={(e) => setMood(e.target.value)} />
        <Input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <div className="flex gap-2">
          <Button onClick={saveLog}>{editingId ? "Update Session" : "Add Session"}</Button>
          {editingId && (
            <Button variant="outline" onClick={clearForm}>
              Cancel
            </Button>
          )}
        </div>
        <div className="space-y-2 pt-4">
          {logs.map((log) => (
            <div key={log.id} className="rounded-xl border border-white/15 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <p>{log.subject} • {log.duration} mins • {log.mood}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(log.id);
                      setSubject(log.subject);
                      setDuration(log.duration);
                      setMood(log.mood);
                      setNotes(log.notes);
                    }}
                  >
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => deleteLog(log.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold">Pomodoro Focus Mode</h3>
        <p className="mt-2 text-4xl font-bold">
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:
          {String(seconds % 60).padStart(2, "0")}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Auto-saving your draft locally for offline resilience.
        </p>
      </Card>
    </div>
  );
}
