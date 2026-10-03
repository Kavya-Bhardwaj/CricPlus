import { HomeClient } from "@/app/components/home-client";
import { getMatches, getProviderStatus, getPulseInsights } from "@/lib/cricket";
import { demoPlayers } from "@/lib/data";

export default async function HomePage() {
  const matchesResponse = await getMatches();
  const pulseResponse = await getPulseInsights(matchesResponse.data);
  const providerStatus = getProviderStatus();

  return (
    <HomeClient
      matchesResponse={matchesResponse}
      pulseResponse={pulseResponse}
      stars={demoPlayers.slice(0, 3)}
      providerMode={providerStatus.mode}
    />
  );
}
