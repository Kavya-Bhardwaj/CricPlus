import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "CricPulse India", description: "Your personalized Indian cricket hub", manifest: "/manifest.webmanifest" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
