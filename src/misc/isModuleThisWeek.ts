const WEEK_IN_MS = 604_800_000;
const SEMESTER_START = 1_661_727_600_000; // August 29, 2022 00:00
// const SEMESTER_START = 1_642_982_400_000; // January 24, 2022 00:00
// const INITIAL_WEEKS_ELAPSED = 22;

const getCurrentWeek = () =>
  (1 + (+new Date() - SEMESTER_START) / WEEK_IN_MS) | 0;

export const isModuleOnThisWeek = (periods: number[]) => {
  const week = getCurrentWeek();
  for (let i = 0; i < periods.length; i += 2) {
    const [start, end] = [periods[i], periods[i + 1]];
    if (start <= week && week <= end) return true;
  }
  return false;
};
