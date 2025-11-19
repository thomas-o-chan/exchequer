"use client";

import { useEffect, useState } from "react";

interface UpdatingTimerProps {
  /** The time to calculate the difference from, in seconds */
  time: number;
  getDisplayTime: (time: number) => string;
}
/** Displays a timer that displays the difference between the given time and now, updating every second */
export function UpdatingTimer({ time, getDisplayTime }: UpdatingTimerProps) {
  const [duration, setDuration] = useState<number>(getTimeDifferenceFromNow(time));

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = getTimeDifferenceFromNow(time);
      setDuration(diff);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{getDisplayTime(duration) || duration}</span>;
}

export function getDifference(a: number, b: number): number {
  return Math.abs(a - b);
}

export function getTimeDifferenceFromNow(pastTime: number): number {
  const nowSeconds = Date.now() / 1000;
  return getDifference(nowSeconds, pastTime);
}
