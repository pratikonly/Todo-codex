"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Sign in failed");
      return;
    }

    router.push("/dashboard");
  };

  const signUp = async () => {
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Sign up failed");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md space-y-3 p-6">
        <h1 className="text-2xl font-semibold">Welcome to EduPilot</h1>
        <p className="text-sm text-slate-300">Create an account or sign in to continue.</p>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full" onClick={signIn}>
            Sign in
          </Button>
          <Button variant="outline" className="w-full" onClick={signUp}>
            Sign up
          </Button>
        </div>
        <Button variant="outline" className="w-full">Continue with Google</Button>
      </Card>
    </main>
  );
}
