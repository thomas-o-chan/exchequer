import styles from "./header.module.css";
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className={styles.wrapper}>
      <div className={styles.home_icon_link}>
        <Link className={styles.home_icon_link} href="/"><span className={styles.home_icon}>♜</span></Link>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
