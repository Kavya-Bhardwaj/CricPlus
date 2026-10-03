import { NextRequest, NextResponse } from "next/server";
import { searchPlayers } from "@/lib/cricket";
export async function GET(req:NextRequest) { const q=req.nextUrl.searchParams.get("q")||""; return NextResponse.json({data: await searchPlayers(q), demo:true}); }
