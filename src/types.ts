export type LevelStatsType = {
  level: number;
  width: number;
  height: number;
  health: number;
  activeTilesCount: number;
  revealTime: number;
  shortRevealTime: number;
};

export type LevelType = LevelStatsType['level'];
