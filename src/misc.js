export * from "./misc/HTMLToTimetable.js";
export * from "./misc/compressTimetable.js";
export * from "./misc/getWeekdayDates.js";
export * from "./misc/isModuleThisWeek.js";
export * from "./misc/ellipsify.js";

export const [CHROME, SAFARI, EDGE, FIREFOX] = [0, 1, 2, 3];

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
