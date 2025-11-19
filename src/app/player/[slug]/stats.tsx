import { PlayerStatsInfo } from "@/app/types";
import { StatsEntry } from "./statsEntry";

import styles from "./stats.module.css";

interface StatsProps {
  stats: PlayerStatsInfo;
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className={styles.stats_section}>
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
    </section>
  );
}
