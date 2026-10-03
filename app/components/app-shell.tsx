"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, MoreHorizontal, Search, Star, Trophy } from "lucide-react";

const nav = [
  { href: "/", label: "Pulse", icon: Activity },
  { href: "/stars", label: "Stars", icon: Star },
  { href: "/standings", label: "Tables", icon: Trophy },
  { href: "/settings", label: "More", icon: MoreHorizontal }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <header className="top-shell">
        <div>
          <p className="shell-kicker">CricPulse India</p>
          <h1 className="shell-title">Matchday Control Room</h1>
        </div>
        <div className="shell-actions">
          <Link href="/search" className="icon-btn" aria-label="Search players and teams">
            <Search size={18} />
          </Link>
          <button className="avatar-btn" aria-label="Open profile menu">
            KP
          </button>
        </div>
      </header>

      <main className="page-wrap">{children}</main>

      <nav className="bottom-nav" aria-label="Primary">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${active ? "active" : ""}`}>
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
