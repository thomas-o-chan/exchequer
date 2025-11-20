"use client";

import { Button } from "./components/button";
import { Header } from "./components/header";
import { Loading } from "./components/loading";
import { SearchInput } from "./components/searchInput";
import { searchFilter } from "./lib/filter";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [grandMasters, setGrandMasters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await fetch("api/list-gm", { method: "GET" });
      const newGMs = await res.json();
      setGrandMasters(newGMs);
    })();
  }, []);

  const filteredGrandMasters = searchFilter(grandMasters, searchTerm);

  return (
    <div className={styles.page}>
      <Header title="Exchequer" />
      <main className={styles.main}>
        <h1>Grand Masters</h1>
        <SearchInput setSearchFilter={setSearchTerm} />
        {grandMasters.length > 0 ? (
          <DataTable data={grandMasters} visible={filteredGrandMasters} />
        ) : (
          <Loading />
        )}
      </main>
    </div>
  );
}

function DataTable({ data, visible }: { data: string[]; visible: string[] }) {
  return (
    <div>
      {data.map((entry) => {
        return (
          <div
            key={entry}
            className={
              visible.includes(entry)
                ? styles.table_entry
                : styles.table_entry_hidden
            }
          >
            <div>{entry}</div>
            <Button link={`player/${entry}`}>Profile</Button>
          </div>
        );
      })}
    </div>
  );
}
