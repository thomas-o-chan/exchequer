import { StatsObject } from "@/app/types";

import styles from "./stats.module.css";

interface StatSectionProps {
  name: string;
  stats: StatsObject;
}

export function StatsEntry({ name, stats }: StatSectionProps) {
  return (
    <div className={styles.stats_entry}>
      <h3>{name}</h3>
      <div>Last Rating: {stats.last.rating}</div>
      <div>
        Best Rating: {stats.best.rating}
        <a className={styles.link} href={stats.best.game} target="_blank" rel="noopener noreferrer">
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
