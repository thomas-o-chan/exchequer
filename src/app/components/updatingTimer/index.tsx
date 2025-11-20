"use client";

import { useEffect, useState } from "react";
import styles from "./updatingTimer.module.css";
import { getHMS } from "@/app/player/[slug]/formatDate";

interface UpdatingTimerProps {
  /** The time to calculate the difference from, in seconds */
  time: number;
}
/** Displays a timer that displays the difference between the given time and now, updating every second */
export function UpdatingTimer({ time }: UpdatingTimerProps) {
  const [duration, setDuration] = useState<number>(
    getTimeDifferenceFromNow(time)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = getTimeDifferenceFromNow(time);
      setDuration(diff);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span className={styles.timer}>{getHMS(duration) || duration}</span>;
}

export function getDifference(a: number, b: number): number {
  return Math.abs(a - b);
}

/** Returns the difference between the given time, interpreted as seconds and now, in milliseconds */
export function getTimeDifferenceFromNow(pastTime: number): number {
  const nowSeconds = Date.now();
  return getDifference(nowSeconds, pastTime * 1000);
}
