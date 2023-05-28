export const getRandomNumber = (min = 1, max = 100) =>
  Math.floor(Math.random() * (max - min)) + min;
