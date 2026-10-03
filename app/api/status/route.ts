import { NextResponse } from "next/server";
import { getMatches, getProviderStatus } from "@/lib/cricket";

export async function GET() {
  const matches = await getMatches();
  const provider = getProviderStatus();

  return NextResponse.json({
    ok: true,
    provider,
    demo: matches.demo,
    lastUpdated: matches.lastUpdated,
    totalMatches: matches.data.length
  });
}
