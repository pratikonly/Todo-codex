import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo Codex",
  description: "A fresh Next.js App Router starter."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
