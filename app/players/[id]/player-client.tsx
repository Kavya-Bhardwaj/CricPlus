"use client";

import { useState } from "react";
import type { PlayerProfile } from "@/lib/types";

export function PlayerClient({ player, demo }: { player: PlayerProfile; demo: boolean }) {
  const [format, setFormat] = useState<"ODI" | "T20I" | "Test">("ODI");
  const split = player.career.find((entry) => entry.format === format) ?? player.career[0];

  return (
    <div className="stack-xl">
      <section className="panel">
        <p className="meta-line">{player.country}</p>
        <h2>{player.name}</h2>
        <p className="meta-line">{player.role}</p>
        {demo ? <p className="meta-line">Demo profile data</p> : null}
      </section>

      <section className="panel">
        <div className="filter-row" role="tablist" aria-label="Career format">
          {(["ODI", "T20I", "Test"] as const).map((item) => (
            <button
              key={item}
              className={`chip ${item === format ? "active" : ""}`}
              onClick={() => setFormat(item)}
              role="tab"
              aria-selected={item === format}
            >
              {item}
            </button>
          ))}
        </div>

        <h3>Batting</h3>
        <div className="mini-grid">
          {split?.batting.map((stat) => (
            <div key={stat.label} className="mini-cell">
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        <h3>Bowling</h3>
        <div className="mini-grid">
          {split?.bowling.map((stat) => (
            <div key={stat.label} className="mini-cell">
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Recent form</h3>
        <div className="stars-row">
          {player.form.map((entry, index) => (
            <div className="star-pill" key={`${entry}-${index}`}>
              <span>{entry}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
