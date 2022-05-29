import {levels} from 'levels';
import {LevelType} from 'types';

export const generateArray = <T>(size: number, element: T): T[] => {
  const array = new Array(size).fill(null).map(() => element);
  return array;
};

export const generateRandomInteger = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getLevelStats = (currentLevel: LevelType, onFail: () => void) => {
  const levelStats = levels.find(({level}) => level === currentLevel);
  if (!levelStats) {
    onFail();
    return levels[0];
  }
  return levelStats;
};

export const getTilesArray = (height: number, width: number) =>
  generateArray(height * width, null).map((_, i) => i + 1);

export const doesNextLevelExist = (currentLevel: LevelType) =>
  levels.find(level => level.level === currentLevel + 1);

export const getFormattedTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
};
