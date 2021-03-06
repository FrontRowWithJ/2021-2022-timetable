const DAY_IN_MS = 86_400_000;
const getDateString = (date) => {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
  return `${day} ${date.getDate()} ${month} ${date.getFullYear()}`;
};

export const times = (number, iteratee) =>
  [...Array(number).keys()].map(iteratee);

export const getWeekDayDates = () => {
  const currDay = new Date().getDay();
  const offset = (1 - currDay) * DAY_IN_MS;
  const monday = Date.now() + offset;
  return times(5, (i) => new Date(monday + DAY_IN_MS * i)).map(getDateString);
};
