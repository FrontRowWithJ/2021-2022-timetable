export const hoursInTimeRange = (time: string) => {
  const split = time.match(/[0-9]{2}/g) as RegExpMatchArray;
  const start = +split[0];
  const end = +split[2];
  return end - start;
};

export const toTime = (n: number) =>
  `${("" + (n + 9)).padStart(2, "0")}:00 - ${n + 10}:00`;
