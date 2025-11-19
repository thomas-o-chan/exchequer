import { PlayerProfileInfo } from "@/app/types";
import Image from "next/image";

import styles from "./player.module.css";
import { UpdatingTimer } from "@/app/components/updatingTimer";
import { getHMS } from "./formatDate";

interface ProfileSectionProps {
  profile: PlayerProfileInfo;
  countryName?: string;
}

export function ProfileSection({ profile, countryName }: ProfileSectionProps) {
  return (
    <section className={styles.section}>
      <h1>
        {profile.name}
        {profile.title ? ` (${profile.title})` : ""}
      </h1>
      <div className={styles.avatar}>
        <Image
          loading="lazy"
          src={profile.avatar || "/default-avatar.png"}
          alt={`${profile.username}'s avatar`}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.line}>Username: {profile.username}</div>
      <div className={styles.line}>Location: {profile.location || "N/A"}</div>
      <div className={styles.line}>
        Country: {countryName || profile.country || "N/A"}
      </div>
      <div className={styles.line}>Followers: {profile.followers}</div>
      <div className={styles.line}>Status: {profile.status}</div>
      <div className={styles.line}>
        <a href={`${profile.url}`} target="_blank" rel="noopener noreferrer">
          Chess.com Profile
        </a>
      </div>
      <div className={styles.line}>
        Joined: {new Date(profile.joined * 1000).toLocaleDateString()} GMT
      </div>
      <div className={styles.line}>
        Time since last online:{" "}
        <UpdatingTimer time={profile.last_online} getDisplayTime={getHMS} />
      </div>
    </section>
  );
}
