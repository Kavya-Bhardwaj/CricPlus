import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) { const auth=req.headers.get("authorization"); if(process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({error:"Unauthorized"},{status:401}); return NextResponse.json({ok:true, message:"Cron foundation is ready. Add provider + push delivery here."}); }
