"use client";

import Link from "next/link";
import { Bell, BellOff } from "lucide-react";
import { demoPlayers } from "@/lib/data";
import { usePersistentState } from "@/lib/local-state";

export default function StarsPage() {
  const [followed, setFollowed] = usePersistentState<string[]>("cp_followed", demoPlayers.map((p) => p.id));
  const [alerts, setAlerts] = usePersistentState<string[]>("cp_alerts", demoPlayers.slice(0, 2).map((p) => p.id));

  const toggleFollow = (id: string) =>
    setFollowed((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const toggleAlert = (id: string) =>
    setAlerts((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <div className="stack-xl">
      <section className="panel">
        <p className="meta-line">Demo-enabled alerts with local persistence</p>
        <h2>My Stars</h2>
        <p className="meta-line">Follow players and keep milestone notifications on for the ones you track closely.</p>
      </section>

      {demoPlayers.map((player) => {
        const isFollowed = followed.includes(player.id);
        const hasAlert = alerts.includes(player.id);

        return (
          <article className="panel" key={player.id}>
            <div className="hero-head">
              <div>
                <p className="meta-line">{player.role}</p>
                <Link href={`/players/${player.id}`}>
                  <h3>{player.name}</h3>
                </Link>
              </div>
              <div className="star-pill">
                <span>{player.initials}</span>
                <small>{player.currentForm}</small>
              </div>
            </div>

            <div className="mini-grid">
              {player.keyStats.map((stat) => (
                <div key={stat.label} className="mini-cell">
                  <small>{stat.label}</small>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>

            <div className="hero-head" style={{ marginTop: "0.75rem" }}>
              <button className="action-btn" onClick={() => toggleFollow(player.id)} aria-pressed={isFollowed}>
                {isFollowed ? "Following" : "Follow"}
              </button>
              <button className="action-btn" onClick={() => toggleAlert(player.id)} aria-pressed={hasAlert}>
                {hasAlert ? <Bell size={16} /> : <BellOff size={16} />}
                {hasAlert ? "Alerts On" : "Alerts Off"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
