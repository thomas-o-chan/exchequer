"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./player.module.css";
import { PlayerInfo } from "../../types";
import { Loading } from "@/app/components/loading";
import { Header } from "@/app/components/header";
import { Stats } from "./stats";
import { ProfileSection } from "./profile";

export default function Player() {
  const params = useParams();
  const [playerData, setPlayerData] = useState<PlayerInfo | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getPlayerData(params.slug as string);
      setPlayerData(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <Header title={params.slug as string} />
      <main className={styles.main}>
        <PlayerData data={playerData} />
      </main>
    </div>
  );
}

async function getPlayerData(slug: string): Promise<PlayerInfo> {
  const res = await fetch(`/api/player/${slug}`, { method: "GET" });
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
