import { NextRequest, NextResponse } from "next/server";
import { getPlayer } from "@/lib/cricket";
export async function GET(req:NextRequest) { const id=req.nextUrl.searchParams.get("id")||""; const player=await getPlayer(id); return player ? NextResponse.json({data:player}) : NextResponse.json({error:"Player not found"},{status:404}); }
