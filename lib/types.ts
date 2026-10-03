export type MatchStatus = "live" | "upcoming" | "finished";

export type TeamScore = {
  short: string;
  name: string;
  runs?: number;
  wickets?: number;
  overs?: number;
  display?: string;
};

export type MatchCenter = {
  batsmen?: string[];
  bowler?: string;
  requiredRate?: string;
  momentum?: number;
  winProbabilityIndia?: number;
};

export type CricketMatch = {
  id: string;
  status: MatchStatus;
  series: string;
  format: string;
  venue: string;
  startsAt: string;
  teamA: TeamScore;
  teamB: TeamScore;
  result?: string;
  isIndiaMatch?: boolean;
  isWomenMatch?: boolean;
  center?: MatchCenter;
};

export type PlayerStat = {
  label: string;
  value: string;
};

export type CareerSplit = {
  format: "ODI" | "T20I" | "Test";
  batting: PlayerStat[];
  bowling: PlayerStat[];
};

export type PlayerProfile = {
  id: string;
  name: string;
  country: string;
  role: string;
  initials: string;
  form: string[];
  currentForm: "Hot" | "Steady" | "Watch";
  keyStats: PlayerStat[];
  career: CareerSplit[];
  demo?: boolean;
};

export type StandingsRow = {
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  nrr: string;
};

export type PulseInsight = {
  id: string;
  title: string;
  value: string;
  delta?: string;
};

export type DataResponse<T> = {
  data: T;
  demo: boolean;
  lastUpdated: string;
  provider: "demo" | "live";
};
