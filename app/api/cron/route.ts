import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET ? "Bearer " + process.env.CRON_SECRET : null;

  if (expected && auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    message: "Cron foundation is ready. Add provider sync + push delivery in production.",
    limitation: "Web Push requires stored subscriptions and an external push service."
  });
}
