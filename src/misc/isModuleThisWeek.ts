const WEEK_IN_MS = 604_800_000;
const AUGUST = 7;
const LAST_DATE_IN_AUGUST = 31;
const MONDAY = 1;
const DAY_IN_MS = 86_400_000;

const getCurrentWeek = () =>
  (1 + (+new Date() - getSemesterStartDate()) / WEEK_IN_MS) | 0;

const getSemesterStartDate: (now?: Date) => number = (now = new Date()) => {
  const semeserStart = new Date(now.getFullYear(), AUGUST, LAST_DATE_IN_AUGUST);
  while (semeserStart.getDay() !== MONDAY) semeserStart.setTime(+semeserStart - DAY_IN_MS);
  if (+now < +semeserStart) return getSemesterStartDate(new Date(now.getFullYear() - 1, 0, 0));
  return +semeserStart;
}

export const isModuleOnThisWeek = (periods: number[]) => {
  const week = getCurrentWeek();
  for (let i = 0; i < periods.length; i += 2) {
    const [start, end] = [periods[i], periods[i + 1]];
    if (start <= week && week <= end) return true;
  }
  return false;
};
