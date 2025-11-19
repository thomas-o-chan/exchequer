"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./player.module.css";
import { PlayerInfo } from "../types";
import { Loading } from "@/app/components/loading";
import { getHMS } from "./formatDate";
import { UpdatingTimer } from "@/app/components/updatingTimer";
import { Header } from "@/app/components/header";

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
  return (
    <div>
      <h1>
        {data.name}
        {data.title ? ` (${data.title})` : ""}
      </h1>
      <div className={styles.line}>Username: {data.username}</div>
      <div className={styles.line}>Location: {data.location || "N/A"}</div>
      <div className={styles.line}>Country: {data.country || "N/A"}</div>
      <div className={styles.line}>Followers: {data.followers}</div>
      <div className={styles.line}>Status: {data.status}</div>
      <div className={styles.line}>
        Joined: {new Date(data.joined * 1000).toLocaleDateString()} GMT
      </div>
      <div className={styles.line}>
        Time since last online: <UpdatingTimer time={data.last_online} getDisplayTime={getHMS} />
      </div>
    </div>
  );
}
