import styles from "./player.module.css";
import { PlayerInfo } from "../../types";
import { Loading } from "@/app/components/loading";
import { Header } from "@/app/components/header";
import { Stats } from "./stats";
import { ProfileSection } from "./profile";

// Note, this was originally a server component, and while it builds successfully locally,
// on Vercel it throws an internal server error.
export default async function Player({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playerData = await getPlayerData(slug);

  return (
    <div className={styles.page}>
      <Header title={slug as string} />
      <main className={styles.main}>
        <PlayerData data={playerData} />
      </main>
    </div>
  );
}

async function getPlayerData(slug: string): Promise<PlayerInfo> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/player/${slug}`, { method: "GET" });
  return await res.json();
}

function PlayerData({ data }: { data: PlayerInfo | null }) {
  if (!data) {
    return <Loading />;
  }
  const { profile, stats, countryName } = data;
  return (
    <div>
      <ProfileSection profile={profile} countryName={countryName} />
      <Stats stats={stats} />
    </div>
  );
}
