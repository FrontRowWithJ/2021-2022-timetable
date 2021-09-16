import { times } from "lodash";

export const setScrollBar = (elem) => {
  const parent = elem.parentElement;
  const { bottom } = elem.getBoundingClientRect();
  const canScroll =
    bottom > (window.innerHeight || document.documentElement.clientHeight);
  parent.style.overflowY = canScroll ? "" : "hidden";
};

export const today = new Date();

const DAY_IN_MILLISECONDS = 86_400_000;
export const getWeekDayDates = () => {
  const currDay = today.getDay();
  const offset = (1 - currDay) * DAY_IN_MILLISECONDS;
  const monday = Date.now() + offset;
  return times(5, (i) => new Date(monday + DAY_IN_MILLISECONDS * i)).map(
    getDateString
  );
};

const getDateString = (date) => {
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
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
};

const toNum = (s = "") => parseInt(s.substring(0, 2));
const regex = /[0-9]+:/g;
export const getTimeRange = (s) => s.match(regex).map(toNum);

export const activityColors = [
  { bgColor: "#2929A3", textColor: "white" },
  { bgColor: "#E8AA14", textColor: "black" },
  { bgColor: "#F5054F", textColor: "white" },
  { bgColor: "#693696", textColor: "white" },
];

export const between = (x = 0, min = 0, max = 0) => x >= min && x < max;

export const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

export const getLeft = (i, x) => (i - x) * 100 + "%";

export const toggle = (elem) => elem.classList.toggle("slide-horizontally");

