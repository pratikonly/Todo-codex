import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nimbus Tasks",
  description: "A smart, glassmorphism task tracker with a focus on momentum."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
