import { NextRequest, NextResponse } from "next/server";

type ReminderState = { matchId: string; enabled: boolean; updatedAt: string };

const memoryReminders = new Map<string, ReminderState>();

export async function GET() {
  return NextResponse.json({
    data: Array.from(memoryReminders.values()),
    demo: true,
    note: "In demo mode reminder state is persisted in browser localStorage."
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { matchId?: string; enabled?: boolean };

  if (!body.matchId) {
    return NextResponse.json({ error: "matchId is required" }, { status: 400 });
  }

  const reminder: ReminderState = {
    matchId: body.matchId,
    enabled: body.enabled ?? true,
    updatedAt: new Date().toISOString()
  };

  memoryReminders.set(body.matchId, reminder);

  return NextResponse.json({
    ok: true,
    data: reminder,
    demo: true,
    persistence: "localStorage-first with Supabase-ready API contract"
  });
}
