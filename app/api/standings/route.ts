import { NextResponse } from "next/server";
import { getStandings } from "@/lib/cricket";

export async function GET() {
  const response = await getStandings();
  return NextResponse.json(response);
}
