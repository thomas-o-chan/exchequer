import styles from "./searchinput.module.css";

export function SearchInput({
  setSearchFilter,
}: {
  setSearchFilter: (filter: string) => void;
}) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="search"
        onChange={(e) => setSearchFilter(e.target.value)}
      />
    </div>
  );
}
