import { NextRequest, NextResponse } from "next/server";
import { getMatches } from "@/lib/cricket";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  const scope = request.nextUrl.searchParams.get("scope");

  const response = await getMatches();
  let data = response.data;

  if (status === "live" || status === "upcoming" || status === "finished") {
    data = data.filter((match) => match.status === status);
  }

  if (scope === "india") {
    data = data.filter((match) => match.isIndiaMatch);
  }

  return NextResponse.json({ ...response, data });
}
