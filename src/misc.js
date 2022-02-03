export * from "./misc/HTMLToTimetable.js";
export * from "./misc/compressTimetable.js";
export * from "./misc/getWeekdayDates.js";
export * from "./misc/isModuleThisWeek.js";
export * from "./misc/ellipsify.js";
export * from "./misc/colourFunctions.js";

export const [CHROME, SAFARI, EDGE, FIREFOX] = [0, 1, 2, 3];
export const [DEFAULT, CLEAR_TIMETABLE, COPY, CUSTOMIZE] = [0, 1, 2, 3];
export const ACTIVITIES = [
  "Lecture",
  "Tutorial",
  "Laboratory",
  "Online Live Event",
];
export const setScrollBar = (elem) => {
  const parent = elem.parentElement;
  parent.style.overflowY = canScroll(elem) ? "" : "hidden";
  parent.scrollTop = 0;
};

export const canScroll = (elem) => {
  const { bottom } = elem.getBoundingClientRect();
  return bottom > (window.innerHeight || document.documentElement.clientHeight);
};

export const getLeft = (i, x) => (i - x) * 100 + "%";

export const base64ToURLSafe = (str = "") => {
  return str.replaceAll(/[+/=]/g, (match) => {
    return { "+": ".", "/": "_", "=": "-" }[match];
  });
};

export const URLSafetoBase64 = (str = "") => {
  return str.replaceAll(/[._-]/g, (match) => {
    return { ".": "+", _: "/", "-": "=" }[match];
  });
};

export const getBaseURL = (url = window.location) =>
  `${url.protocol}//${url.host}/${url.pathname.split("/")[1]}`;
