"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./player.module.css";
import { PlayerInfo, PlayerStatsInfo, StatsObject } from "../../types";
import { Loading } from "@/app/components/loading";
import { getHMS } from "./formatDate";
import { UpdatingTimer } from "@/app/components/updatingTimer";
import { Header } from "@/app/components/header";
import Image from "next/image";

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
      <div>
        <h1>
          {profile.name}
          {profile.title ? ` (${profile.title})` : ""}
        </h1>
        <div className={styles.avatar}>
          <Image
            src={profile.avatar || "/default-avatar.png"}
            alt={`${profile.username}'s avatar`}
            width={200}
            height={200}
          />
        </div>
        <div className={styles.line}>Username: {profile.username}</div>
        <div className={styles.line}>Location: {profile.location || "N/A"}</div>
        <div className={styles.line}>
          Country: {countryName || profile.country || "N/A"}
        </div>
        <div className={styles.line}>Followers: {profile.followers}</div>
        <div className={styles.line}>Status: {profile.status}</div>
        <div className={styles.line}>
          <a href={`${profile.url}`} target="_blank" rel="noopener noreferrer">
            Chess.com Profile
          </a>
        </div>
        <div className={styles.line}>
          Joined: {new Date(profile.joined * 1000).toLocaleDateString()} GMT
        </div>
        <div className={styles.line}>
          Time since last online:{" "}
          <UpdatingTimer time={profile.last_online} getDisplayTime={getHMS} />
        </div>
      </div>
      <Stats stats={stats} />
    </div>
  );
}

interface StatsProps {
  stats: PlayerStatsInfo;
}

function Stats({ stats }: StatsProps) {
  return (
    <div className={styles.stats_section}>
      <h2>Statistics</h2>
      {stats.chess_blitz ? (
        <StatsEntry name="Blitz" stats={stats.chess_blitz} />
      ) : null}
      {stats.chess_bullet ? (
        <StatsEntry name="Bullet" stats={stats.chess_bullet} />
      ) : null}
      {stats.chess_rapid ? (
        <StatsEntry name="Rapid" stats={stats.chess_rapid} />
      ) : null}
      {stats.chess_daily ? (
        <StatsEntry name="Daily" stats={stats.chess_daily} />
      ) : null}
    </div>
  );
}

interface StatSectionProps {
  name: string;
  stats: StatsObject;
}

function StatsEntry({ name, stats }: StatSectionProps) {
  return (
    <div>
      <h3>{name}</h3>
      <div>Last Rating: {stats.last.rating}</div>
      <div>
        Best Rating: {stats.best.rating}
        <a href={stats.best.game} target="_blank" rel="noopener noreferrer">
          See game
        </a>
      </div>
      <div>
        Record: Wins - {stats.record.win}, Losses - {stats.record.loss}, Draws -{" "}
        {stats.record.draw}
      </div>
    </div>
  );
}
