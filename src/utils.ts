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
