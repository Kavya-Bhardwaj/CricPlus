import { NextRequest, NextResponse } from "next/server";
import { searchPlayers } from "@/lib/cricket";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const response = await searchPlayers(query);

  return NextResponse.json(response);
}
