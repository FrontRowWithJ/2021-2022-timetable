const DAY_IN_MS = 86_400_000;
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "long", month: "long", year: "numeric", day: "2-digit"
}
const getDateString = (date: Date) =>
  date.toLocaleString("Dublin", DATE_FORMAT_OPTIONS);

type Callback<T> = (value: number) => T;
type Literal<T> = T;
type CallbackOrLiteral<T> = Callback<T> | Literal<T>;

export const times = <T>(n: number, cbOrLiteral: CallbackOrLiteral<T>) => {
  return typeof cbOrLiteral === "function"
    ? [...new Array(n).keys()].map<T>(cbOrLiteral as Callback<T>)
    : [...new Array(n).keys()].map<typeof cbOrLiteral>(() => cbOrLiteral);
};

export const getWeekDayDates = () => {
  const currDay = new Date().getDay();
  const offset = (1 - currDay) * DAY_IN_MS;
  const monday = Date.now() + offset;
  return times(5, (i) => new Date(monday + DAY_IN_MS * i)).map(getDateString);
};
