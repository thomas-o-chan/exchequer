import styles from "./header.module.css";
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className={styles.wrapper}>
      <div className={styles.home_icon}>
        <Link href="/">♜</Link>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
