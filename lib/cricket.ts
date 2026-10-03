import "server-only";

import { demoMatches, demoPlayers, demoPulse, demoStandings } from "./data";
import type { CricketMatch, DataResponse, PlayerProfile, PulseInsight, StandingsRow } from "./types";

const REQUEST_TIMEOUT_MS = 5000;

function nowIso() {
  return new Date().toISOString();
}

function hasLiveProvider() {
  return Boolean(process.env.CRICKET_API_BASE_URL && process.env.CRICKET_API_KEY);
}

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "x-api-key": process.env.CRICKET_API_KEY ?? "",
        ...(init?.headers ?? {})
      },
      next: { revalidate: 30 }
    });
    if (!response.ok) {
      throw new Error(`Provider request failed (${response.status})`);
    }
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function asText(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/**
 * Provider shape mapping entry point.
 * Replace these accessors if your free provider uses different field names.
 */
function mapProviderMatch(raw: unknown): CricketMatch | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const id = asText(item.id);
  const teamA = asText(item.teamAName || item.teamA || item.homeTeam);
  const teamB = asText(item.teamBName || item.teamB || item.awayTeam);
  if (!id || !teamA || !teamB) return null;

  const statusRaw = asText(item.status).toLowerCase();
  const status: CricketMatch["status"] =
    statusRaw === "live" ? "live" : statusRaw === "finished" || statusRaw === "completed" ? "finished" : "upcoming";

  const indiaCheck = `${teamA} ${teamB}`.toLowerCase();

  return {
    id,
    status,
    series: asText(item.seriesName || item.series || "International Fixture"),
    format: asText(item.format || "Cricket"),
    venue: asText(item.venue || "TBA"),
    startsAt: asText(item.startsAt || item.date || nowIso()),
    isIndiaMatch: indiaCheck.includes("india"),
    isWomenMatch: indiaCheck.includes("women"),
    result: asText(item.result),
    center: {
      batsmen: Array.isArray(item.batsmen) ? (item.batsmen as unknown[]).filter((v): v is string => typeof v === "string") : undefined,
      bowler: asText(item.bowler) || undefined,
      requiredRate: asText(item.requiredRate) || undefined,
      momentum: asNumber(item.momentum),
      winProbabilityIndia: asNumber(item.winProbabilityIndia)
    },
    teamA: {
      name: teamA,
      short: asText(item.teamAShort || teamA.slice(0, 3).toUpperCase()),
      display: asText(item.teamAScore || item.scoreA)
    },
    teamB: {
      name: teamB,
      short: asText(item.teamBShort || teamB.slice(0, 3).toUpperCase()),
      display: asText(item.teamBScore || item.scoreB)
    }
  };
}

function mapProviderPlayer(raw: unknown): PlayerProfile | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const name = asText(item.name);
  const id = asText(item.id || name.toLowerCase().replace(/\s+/g, "-"));
  if (!id || !name) return null;

  return {
    id,
    name,
    country: asText(item.country, "Unknown"),
    role: asText(item.role, "Cricketer"),
    initials: name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    form: Array.isArray(item.form) ? (item.form as string[]) : [],
    currentForm: "Steady",
    keyStats: [],
    career: []
  };
}

function mapProviderStandings(raw: unknown): StandingsRow[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as Record<string, unknown>;
      const team = asText(row.team || row.name);
      if (!team) return null;
      return {
        team,
        played: asNumber(row.played) ?? 0,
        won: asNumber(row.won) ?? 0,
        lost: asNumber(row.lost) ?? 0,
        points: asNumber(row.points) ?? 0,
        nrr: asText(row.nrr, "0.000")
      };
    })
    .filter((entry): entry is StandingsRow => Boolean(entry));
}

function demoResponse<T>(data: T): DataResponse<T> {
  return { data, demo: true, lastUpdated: nowIso(), provider: "demo" };
}

async function tryLive<T>(path: string, mapper: (payload: unknown) => T | null, fallback: T): Promise<DataResponse<T>> {
  if (!hasLiveProvider()) return demoResponse(fallback);

  const base = process.env.CRICKET_API_BASE_URL!.replace(/\/$/, "");
  try {
    const payload = await fetchWithTimeout(`${base}${path}`);
    const mapped = mapper(payload);
    if (!mapped) return demoResponse(fallback);
    return { data: mapped, demo: false, lastUpdated: nowIso(), provider: "live" };
  } catch {
    return demoResponse(fallback);
  }
}

export async function getMatches(): Promise<DataResponse<CricketMatch[]>> {
  return tryLive(
    "/matches",
    (payload) => {
      if (!Array.isArray(payload)) return null;
      const mapped = payload.map(mapProviderMatch).filter((match): match is CricketMatch => Boolean(match));
      return mapped.length > 0 ? mapped : null;
    },
    demoMatches
  );
}

export async function searchPlayers(query: string): Promise<DataResponse<PlayerProfile[]>> {
  const q = query.trim().toLowerCase();
  if (!q) return demoResponse([]);

  const demoFiltered = demoPlayers.filter(
    (player) => player.name.toLowerCase().includes(q) || player.country.toLowerCase().includes(q)
  );

  if (!hasLiveProvider()) return demoResponse(demoFiltered);

  const base = process.env.CRICKET_API_BASE_URL!.replace(/\/$/, "");
  try {
    const payload = await fetchWithTimeout(`${base}/players/search?q=${encodeURIComponent(query)}`);
    const list = Array.isArray(payload) ? payload : [];
    const mapped = list.map(mapProviderPlayer).filter((player): player is PlayerProfile => Boolean(player));
    return { data: mapped.length > 0 ? mapped : demoFiltered, demo: mapped.length === 0, lastUpdated: nowIso(), provider: mapped.length > 0 ? "live" : "demo" };
  } catch {
    return demoResponse(demoFiltered);
  }
}

export async function getPlayer(id: string): Promise<DataResponse<PlayerProfile | null>> {
  const demoPlayer = demoPlayers.find((player) => player.id === id) ?? null;
  const response = await tryLive<PlayerProfile | null>(
    `/players/${encodeURIComponent(id)}`,
    (payload) => mapProviderPlayer(payload),
    demoPlayer
  );
  return response;
}

export async function getStandings(): Promise<DataResponse<StandingsRow[]>> {
  return tryLive(
    "/standings",
    (payload) => {
      const mapped = mapProviderStandings(payload);
      return mapped.length > 0 ? mapped : null;
    },
    demoStandings
  );
}

export async function getPulseInsights(matches: CricketMatch[]): Promise<DataResponse<PulseInsight[]>> {
  const liveMatch = matches.find((match) => match.status === "live");
  if (liveMatch?.center?.winProbabilityIndia) {
    return {
      data: [
        {
          id: "win",
          title: "India Win Probability",
          value: `${liveMatch.center.winProbabilityIndia}%`
        },
        {
          id: "momentum",
          title: "Momentum",
          value: `${liveMatch.center.momentum ?? 50}/100`
        },
        {
          id: "target",
          title: "Required Rate",
          value: liveMatch.center.requiredRate ?? "On track"
        }
      ],
      demo: false,
      lastUpdated: nowIso(),
      provider: "live"
    };
  }

  return demoResponse(demoPulse);
}

export function getProviderStatus() {
  const configured = hasLiveProvider();
  return {
    configured,
    mode: (configured ? "live" : "demo") as "live" | "demo"
  };
}
