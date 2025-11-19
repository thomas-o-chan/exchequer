'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import { PlayerData } from "../types";

export default function Player() {
  const params = useParams();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getPlayerData(params.slug as string);
      setPlayerData(data);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>{JSON.stringify(playerData)}</main>
    </div>
  );
}

async function getPlayerData(slug: string): Promise<PlayerData> {
  const res = await fetch(`/api/player-data/${slug}`, { method: "GET" });
  return await res.json();
}
