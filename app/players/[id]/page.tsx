import { notFound } from "next/navigation";
import { getPlayer } from "@/lib/cricket";
import { PlayerClient } from "./player-client";

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getPlayer(id);

  if (!response.data) {
    notFound();
  }

  return <PlayerClient player={response.data} demo={response.demo} />;
}
