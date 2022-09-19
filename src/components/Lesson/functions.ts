export const between = (min: number, x: number, max: number) =>
  x >= min && x < max;
export const getTimeRange = (s: string) => s.match(/[0-9]+:/g)?.map(toNum);
const toNum = (s: string) => parseInt(s.substring(0, 2));
