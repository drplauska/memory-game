export const generateArray = <T>(size: number, element: T): T[] => {
  const array = new Array(size).fill(null).map(() => element);
  return array;
};

export const generateRandomInteger = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};
