import type { CricketMatch, PlayerProfile, PulseInsight, StandingsRow } from "./types";

export const demoMatches: CricketMatch[] = [
  {
    id: "ind-aus-odi",
    status: "live",
    series: "India vs Australia",
    format: "ODI",
    venue: "Ahmedabad",
    startsAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isIndiaMatch: true,
    teamA: { name: "India", short: "IND", runs: 214, wickets: 4, overs: 39.2, display: "214/4 (39.2)" },
    teamB: { name: "Australia", short: "AUS" },
    center: {
      batsmen: ["Kohli 77 (66)", "Rahul 33 (21)"],
      bowler: "Starc 7-0-41-1",
      requiredRate: "Projected 312",
      momentum: 68,
      winProbabilityIndia: 62
    }
  },
  {
    id: "indw-engw-t20",
    status: "upcoming",
    series: "India Women vs England Women",
    format: "T20I",
    venue: "Mumbai",
    startsAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    isIndiaMatch: true,
    isWomenMatch: true,
    teamA: { name: "India Women", short: "IND-W" },
    teamB: { name: "England Women", short: "ENG-W" }
  },
  {
    id: "sa-nz-odi",
    status: "finished",
    series: "South Africa vs New Zealand",
    format: "ODI",
    venue: "Cape Town",
    startsAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    teamA: { name: "South Africa", short: "SA", display: "241/8" },
    teamB: { name: "New Zealand", short: "NZ", display: "219" },
    result: "South Africa won by 22 runs"
  },
  {
    id: "pak-afg-t20",
    status: "live",
    series: "Pakistan vs Afghanistan",
    format: "T20I",
    venue: "Dubai",
    startsAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    teamA: { name: "Pakistan", short: "PAK", display: "142/6 (18.4)" },
    teamB: { name: "Afghanistan", short: "AFG" },
    center: { momentum: 53 }
  }
];

export const demoPlayers: PlayerProfile[] = [
  {
    id: "virat-kohli",
    name: "Virat Kohli",
    country: "India",
    role: "Top-order batter",
    initials: "VK",
    form: ["45", "112", "0", "68", "89"],
    currentForm: "Hot",
    keyStats: [
      { label: "ODI AVG", value: "58.18" },
      { label: "ODI RUNS", value: "13,906" },
      { label: "50s/100s", value: "72/50" }
    ],
    career: [
      {
        format: "ODI",
        batting: [
          { label: "Matches", value: "295" },
          { label: "Runs", value: "13,906" },
          { label: "SR", value: "93.5" }
        ],
        bowling: [{ label: "Wkts", value: "4" }]
      },
      {
        format: "T20I",
        batting: [
          { label: "Matches", value: "125" },
          { label: "Runs", value: "4,188" },
          { label: "SR", value: "137.0" }
        ],
        bowling: [{ label: "Wkts", value: "4" }]
      },
      {
        format: "Test",
        batting: [
          { label: "Matches", value: "113" },
          { label: "Runs", value: "8,848" },
          { label: "AVG", value: "49.2" }
        ],
        bowling: [{ label: "Wkts", value: "0" }]
      }
    ],
    demo: true
  },
  {
    id: "jasprit-bumrah",
    name: "Jasprit Bumrah",
    country: "India",
    role: "Fast bowler",
    initials: "JB",
    form: ["2/28", "4/39", "1/21", "3/34", "2/18"],
    currentForm: "Steady",
    keyStats: [
      { label: "ODI AVG", value: "23.55" },
      { label: "WICKETS", value: "149" },
      { label: "ECON", value: "4.64" }
    ],
    career: [
      {
        format: "ODI",
        batting: [{ label: "Runs", value: "91" }],
        bowling: [
          { label: "Matches", value: "89" },
          { label: "Wickets", value: "149" },
          { label: "Best", value: "6/19" }
        ]
      },
      {
        format: "T20I",
        batting: [{ label: "Runs", value: "8" }],
        bowling: [
          { label: "Matches", value: "70" },
          { label: "Wickets", value: "89" },
          { label: "Economy", value: "6.27" }
        ]
      },
      {
        format: "Test",
        batting: [{ label: "Runs", value: "331" }],
        bowling: [
          { label: "Matches", value: "40" },
          { label: "Wickets", value: "173" },
          { label: "Average", value: "20.69" }
        ]
      }
    ],
    demo: true
  },
  {
    id: "smriti-mandhana",
    name: "Smriti Mandhana",
    country: "India Women",
    role: "Opening batter",
    initials: "SM",
    form: ["74", "12", "86", "45", "101"],
    currentForm: "Hot",
    keyStats: [
      { label: "ODI AVG", value: "47.03" },
      { label: "ODI RUNS", value: "3,800+" },
      { label: "100s", value: "9" }
    ],
    career: [
      {
        format: "ODI",
        batting: [
          { label: "Matches", value: "92" },
          { label: "Runs", value: "3,811" },
          { label: "SR", value: "86.0" }
        ],
        bowling: [{ label: "Wkts", value: "0" }]
      },
      {
        format: "T20I",
        batting: [
          { label: "Matches", value: "140" },
          { label: "Runs", value: "3,400+" },
          { label: "SR", value: "123.2" }
        ],
        bowling: [{ label: "Wkts", value: "0" }]
      },
      {
        format: "Test",
        batting: [{ label: "Matches", value: "7" }, { label: "Runs", value: "629" }],
        bowling: [{ label: "Wkts", value: "0" }]
      }
    ],
    demo: true
  }
];

export const demoStandings: StandingsRow[] = [
  { team: "India", played: 6, won: 5, lost: 1, points: 10, nrr: "+1.142" },
  { team: "Australia", played: 6, won: 4, lost: 2, points: 8, nrr: "+0.732" },
  { team: "England", played: 6, won: 3, lost: 3, points: 6, nrr: "+0.120" },
  { team: "South Africa", played: 6, won: 2, lost: 4, points: 4, nrr: "-0.405" }
];

export const demoPulse: PulseInsight[] = [
  { id: "win", title: "India Win Probability", value: "62%", delta: "+4% last 10 overs" },
  { id: "rr", title: "Current Run Pulse", value: "5.44", delta: "Above par" },
  { id: "wk", title: "Wickets in Hand", value: "6", delta: "Power finish likely" }
];
