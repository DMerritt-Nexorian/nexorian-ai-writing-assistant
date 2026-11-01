import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexorian AI Writing Assistant",
  description: "High-integrity AI writing for ads, product descriptions, emails, whitepapers and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}