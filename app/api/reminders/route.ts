import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) { const body=await req.json().catch(()=>({})); return NextResponse.json({ok:true, message:`Reminder saved for ${body.matchId||"match"}. Connect Supabase to persist it.`}); }
