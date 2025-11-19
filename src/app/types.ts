export interface PlayerInfo {
  profile: PlayerProfileInfo;
  stats: PlayerStatsInfo;
  countryName?: string;
}

export interface PlayerProfileInfo {
  avatar?: string;
  player_id: number;
  "@id": string;
  url: string;
  name?: string;
  username: string;
  title?: string;
  followers: number;
  country: string;
  location?: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: false;
  verified: false;
  league: string;
  streaming_platforms: string[];
}

export interface PlayerStatsInfo {
  chess_daily?: StatsObject;
  chess_rapid?: StatsObject;
  chess_bullet?: StatsObject;
  chess_blitz?: StatsObject;
  tactics?: {
    highest: DatedRating;
    lowest: DatedRating;
  };
  lessons?: {
    highest: DatedRating;
    lowest: DatedRating;
  };
  puzzle_rush?: {
    best: {
      total_attempts: number;
      score: number;
    };
  };
}

export interface StatsObject {
  last: {
    rating: number;
    date: number;
    rd: number;
  };
  best: {
    rating: number;
    date: number;
    /** The URL of the game */
    game: string;
  };
  record: {
    win: number;
    loss: number;
    draw: number;
    time_per_move: number;
    timeout_percent: number;
  };
}

export interface DatedRating {
  date: number;
  rating: number;
}
