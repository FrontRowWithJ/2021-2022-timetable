const WEEK_IN_MILLISECONDS = 604_800_000;
const SEMESTER_START = new Date("January 24, 2022 00:00:00").getTime();
const INITIAL_WEEKS_ELAPSED = 22;
const getCurrentWeek = (today = +new Date()) =>
  (INITIAL_WEEKS_ELAPSED + (today - SEMESTER_START) / WEEK_IN_MILLISECONDS) | 0;

export const isModuleOnThisWeek = (periods) => {
  const week = getCurrentWeek();
  for (let i = 0; i < periods.length; i += 2) {
    const [start, end] = [periods[i], periods[i + 1]];
    if (start <= week && week <= end) return true;
  }
  return false;
};
