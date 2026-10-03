import { matches, players } from "./data";

export async function getMatches() { return matches; }
export async function searchPlayers(query:string) { return players.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.country.toLowerCase().includes(query.toLowerCase())); }
export async function getPlayer(id:string) { return players.find(p => p.id === id); }
