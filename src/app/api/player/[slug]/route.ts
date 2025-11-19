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

    assertProfileData(profileData);

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
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
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

/** Basic validation for structure of PlayerProfileInfo */
function assertProfileData(data: unknown): asserts data is PlayerProfileInfo {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid profile data: not an object");
  }
  const missingProps: string[] = [];
  const requiredProps = [
    "player_id",
    "@id",
    "url",
    "username",
    "followers",
    "country",
    "last_online",
    "joined",
    "status",
    "is_streamer",
    "verified",
    "league",
    "streaming_platforms",
  ];
  requiredProps.forEach((prop) => {
    if (!(prop in data)) {
      missingProps.push(prop);
    }
  });
  if (missingProps.length > 0) {
    throw new Error(
      `Invalid profile data: missing properties: ${missingProps.join(", ")}`
    );
  }
}
