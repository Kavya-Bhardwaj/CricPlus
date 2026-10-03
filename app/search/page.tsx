"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PlayerProfile } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<PlayerProfile[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setPlayers([]);
      setError(null);
      return;
    }

    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Search failed");
        const payload = (await response.json()) as { data: PlayerProfile[] };
        setPlayers(payload.data);
      } catch {
        setError("Could not load search results.");
      } finally {
        setLoading(false);
      }
    }, 320);

    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <div className="stack-xl">
      <section className="panel">
        <h2>Global Search</h2>
        <p className="meta-line">Search players and teams</p>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: Kohli, India Women, Bumrah"
          className="mini-cell"
          style={{ width: "100%", color: "inherit", background: "transparent" }}
          aria-label="Search players and teams"
        />
      </section>

      <section className="panel">
        {loading ? <p className="meta-line">Searching...</p> : null}
        {!loading && !query ? <p className="meta-line">Start typing to see results.</p> : null}
        {error ? <p className="meta-line">{error}</p> : null}
        {!loading && query && !error && players.length === 0 ? <p className="meta-line">No players found.</p> : null}

        <div className="timeline">
          {players.map((player) => (
            <Link key={player.id} href={`/players/${player.id}`}>
              <article>
                <p>{player.name}</p>
                <small>
                  {player.role} · {player.country}
                </small>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
