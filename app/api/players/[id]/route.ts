import { NextResponse } from "next/server";
import { getPlayer } from "@/lib/cricket";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getPlayer(id);

  if (!response.data) {
    return NextResponse.json({ error: "Player not found", demo: response.demo }, { status: 404 });
  }

  return NextResponse.json(response);
}
