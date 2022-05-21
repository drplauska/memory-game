export type LevelObjectType = {
  level: number;
  width: number;
  height: number;
  health: number;
  activeTilesCount: number;
};

export type LevelType = LevelObjectType['level'];
