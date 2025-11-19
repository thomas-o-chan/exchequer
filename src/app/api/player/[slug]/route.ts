import { PlayerInfo, PlayerProfileInfo, PlayerStatsInfo } from "@/app/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: playerId } = await params;
    const [profileData, statsData] = await Promise.all([
      getProfileData(playerId),
      getStatsData(playerId),
    ]);
    const data: PlayerInfo = {
      profile: profileData,
      stats: statsData,
    };
    if (data.profile.country) {
      data.countryName = await getCountryName(data.profile.country);
    }
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch player data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

async function getCountryName(countryUrl: string): Promise<string> {
  const res = await fetch(countryUrl);
  const countryData = await res.json();
  return countryData.name;
}

async function getProfileData(playerId: string): Promise<PlayerProfileInfo> {
  const res = await fetch(`https://api.chess.com/pub/player/${playerId}`);
  return await res.json();
}

async function getStatsData(playerId: string): Promise<PlayerStatsInfo> {
  const res = await fetch(`https://api.chess.com/pub/player/${playerId}/stats`);
  return await res.json();
}
