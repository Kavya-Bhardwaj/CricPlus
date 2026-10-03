"use client";

import { useMemo } from "react";
import { usePersistentState } from "@/lib/local-state";

export default function SettingsPage() {
  const [prefs, setPrefs] = usePersistentState("cp_prefs", {
    reminders: true,
    playerAlerts: true,
    reducedMotion: false
  });

  const supabaseReady = useMemo(
    () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    []
  );

  return (
    <div className="stack-xl">
      <section className="panel">
        <h2>Settings & More</h2>
        <p className="meta-line">
          Preferences persist in local demo mode and can be wired to Supabase when credentials are configured.
        </p>
      </section>

      <section className="panel">
        <label className="hero-head">
          <span>Match reminders</span>
          <input
            type="checkbox"
            checked={prefs.reminders}
            onChange={(event) => setPrefs((current) => ({ ...current, reminders: event.target.checked }))}
          />
        </label>
        <label className="hero-head">
          <span>Player milestone alerts</span>
          <input
            type="checkbox"
            checked={prefs.playerAlerts}
            onChange={(event) => setPrefs((current) => ({ ...current, playerAlerts: event.target.checked }))}
          />
        </label>
        <label className="hero-head">
          <span>Reduced motion preference</span>
          <input
            type="checkbox"
            checked={prefs.reducedMotion}
            onChange={(event) => setPrefs((current) => ({ ...current, reducedMotion: event.target.checked }))}
          />
        </label>
      </section>

      <section className="panel">
        <h3>Integration status</h3>
        <p className="meta-line">Supabase: {supabaseReady ? "Configured" : "Not configured (demo fallback active)"}</p>
        <p className="meta-line">
          Web Push note: browser notifications require HTTPS (localhost allowed) and a push subscription backend.
        </p>
      </section>
    </div>
  );
}
