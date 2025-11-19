import styles from "./loading.module.css";

export function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>Loading...</div>
    </div>
  );
}
