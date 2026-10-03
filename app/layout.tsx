import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/app/components/app-shell";

export const metadata: Metadata = {
  title: "CricPulse India · Matchday Control Room",
  description: "Mobile-first cricket pulse with live scores, stars, and India-first radar.",
  manifest: "/manifest.webmanifest",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export const viewport: Viewport = {
  themeColor: "#091127",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
