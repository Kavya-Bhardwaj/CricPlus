import { NextRequest, NextResponse } from "next/server";
import { searchPlayers } from "@/lib/cricket";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const response = await searchPlayers(q);
  return NextResponse.json(response);
}
