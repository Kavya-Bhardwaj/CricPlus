"use client";

import Link from "next/link";
import { Bell, BellRing, Clock3 } from "lucide-react";
import { useMemo, useState } from "react";
import type { CricketMatch, DataResponse, PlayerProfile, PulseInsight } from "@/lib/types";
import { usePersistentState } from "@/lib/local-state";

function formatTime(dateIso: string) {
  const date = new Date(dateIso);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function Countdown({ startsAt }: { startsAt: string }) {
  const diff = new Date(startsAt).getTime() - Date.now();
  if (diff <= 0) return <span>Starting now</span>;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return (
    <span>
      Starts in {hours}h {minutes}m
    </span>
  );
}

export function HomeClient({
  matchesResponse,
  pulseResponse,
  stars,
  providerMode
}: {
  matchesResponse: DataResponse<CricketMatch[]>;
  pulseResponse: DataResponse<PulseInsight[]>;
  stars: PlayerProfile[];
  providerMode: "live" | "demo";
}) {
  const [filter, setFilter] = useState<"live" | "upcoming" | "finished">("live");
  const [reminders, setReminders] = usePersistentState<string[]>("cp_reminders", []);

  const liveMatch = useMemo(
    () => matchesResponse.data.find((match) => match.status === "live" && match.isIndiaMatch) ?? matchesResponse.data[0],
    [matchesResponse.data]
  );

  const upcomingIndiaMatch = matchesResponse.data.find((match) => match.status === "upcoming" && match.isIndiaMatch);
  const indiaRadar = matchesResponse.data.filter((match) => match.isIndiaMatch);
  const globalMatches = matchesResponse.data.filter((match) => match.status === filter);

  const toggleReminder = async (matchId: string) => {
    const exists = reminders.includes(matchId);
    const next = exists ? reminders.filter((id) => id !== matchId) : [...reminders, matchId];
    setReminders(next);
    await fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, enabled: !exists })
    }).catch(() => undefined);
  };

  return (
    <div className="stack-xl">
      <section className="status-row" aria-live="polite">
        <p>{new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}</p>
        <p>{providerMode === "demo" ? "Demo Data" : "Live Data"}</p>
      </section>

      {liveMatch ? (
        <section className="hero-match" aria-labelledby="live-match-title">
          <div className="hero-head">
            <h2 id="live-match-title">Live Match Center</h2>
            <span className={`live-pill ${liveMatch.status}`}>{liveMatch.status.toUpperCase()}</span>
          </div>
          <p className="hero-series">{liveMatch.series}</p>
          <div className="hero-score-grid">
            <div>
              <p>{liveMatch.teamA.short}</p>
              <strong>{liveMatch.teamA.display ?? "-"}</strong>
            </div>
            <div>
              <p>{liveMatch.teamB.short}</p>
              <strong>{liveMatch.teamB.display ?? "Yet to bat"}</strong>
            </div>
          </div>
          <p className="meta-line">
            {liveMatch.format} · {liveMatch.venue} · {formatTime(liveMatch.startsAt)}
          </p>
          {liveMatch.center && (
            <div className="mini-grid" role="list">
              {(liveMatch.center.batsmen ?? []).slice(0, 2).map((entry) => (
                <div key={entry} role="listitem" className="mini-cell">
                  {entry}
                </div>
              ))}
              {liveMatch.center.bowler ? <div className="mini-cell">Bowler: {liveMatch.center.bowler}</div> : null}
              {liveMatch.center.requiredRate ? <div className="mini-cell">{liveMatch.center.requiredRate}</div> : null}
            </div>
          )}
        </section>
      ) : null}

      {upcomingIndiaMatch ? (
        <section className="module-card">
          <div className="hero-head">
            <h3>Upcoming India Match</h3>
            <Clock3 size={16} />
          </div>
          <p className="meta-line">{upcomingIndiaMatch.series}</p>
          <p className="meta-line">
            <Countdown startsAt={upcomingIndiaMatch.startsAt} />
          </p>
          <button
            className="action-btn"
            onClick={() => toggleReminder(upcomingIndiaMatch.id)}
            aria-pressed={reminders.includes(upcomingIndiaMatch.id)}
          >
            {reminders.includes(upcomingIndiaMatch.id) ? <BellRing size={16} /> : <Bell size={16} />}
            {reminders.includes(upcomingIndiaMatch.id) ? "Reminder On" : "Set Reminder"}
          </button>
        </section>
      ) : null}

      <section className="module-card">
        <h3>India Radar</h3>
        <div className="timeline">
          {indiaRadar.map((match) => (
            <article key={match.id}>
              <p>{match.series}</p>
              <small>
                {match.status.toUpperCase()} · {match.teamA.short} vs {match.teamB.short}
              </small>
            </article>
          ))}
        </div>
      </section>

      <section className="module-card">
        <div className="hero-head">
          <h3>Global Liveboard</h3>
          <div className="filter-row" role="tablist" aria-label="Match status filter">
            {(["live", "upcoming", "finished"] as const).map((status) => (
              <button
                key={status}
                className={`chip ${filter === status ? "active" : ""}`}
                role="tab"
                aria-selected={filter === status}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="timeline">
          {globalMatches.map((match) => (
            <article key={match.id}>
              <p>
                {match.teamA.short} vs {match.teamB.short}
              </p>
              <small>{match.result ?? `${match.series} · ${match.venue}`}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="module-card">
        <h3>Pulse Insights</h3>
        <div className="insights-grid">
          {pulseResponse.data.map((insight) => (
            <article key={insight.id} className="insight-item">
              <p>{insight.title}</p>
              <strong>{insight.value}</strong>
              {insight.delta ? <small>{insight.delta}</small> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="module-card">
        <div className="hero-head">
          <h3>Followed Stars</h3>
          <Link href="/stars" className="text-link">
            Open
          </Link>
        </div>
        <div className="stars-row">
          {stars.map((star) => (
            <Link key={star.id} href={`/players/${star.id}`} className="star-pill">
              <span>{star.initials}</span>
              <small>{star.name}</small>
            </Link>
          ))}
        </div>
      </section>

      <footer className="foot-note">
        <span>{matchesResponse.demo ? "Demo data mode" : "Live provider connected"}</span>
        <span>Last updated: {new Date(matchesResponse.lastUpdated).toLocaleTimeString()}</span>
      </footer>
    </div>
  );
}
