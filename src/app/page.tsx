"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [grandMasters, setGrandMasters] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("api/list-gm", { method: 'GET'});
      const newGMs = await res.json();
      setGrandMasters(newGMs);
    })();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>{JSON.stringify(grandMasters)}</main>
    </div>
  );
}
