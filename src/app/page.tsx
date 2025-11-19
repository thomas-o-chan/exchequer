"use client";

import Button from "./components/button";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [grandMasters, setGrandMasters] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("api/list-gm", { method: "GET" });
      const newGMs = await res.json();
      setGrandMasters(newGMs);
    })();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Grand Masters</h1>
        <DataTable data={grandMasters} />
      </main>
    </div>
  );
}

function DataTable({ data }: { data: string[] }) {
  return (
    <div>
      {data.map((entry) => {
        return (
          <div key={entry} className={styles.table_entry}>
            <div>{entry}</div>
            <Button link={`player/${entry}`}>Profile</Button>
          </div>
        );
      })}
    </div>
  );
}
