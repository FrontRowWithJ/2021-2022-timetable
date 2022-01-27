export * from "./misc/HTMLToTimetable.js";
export * from "./misc/compressTimetable.js";
export * from "./misc/getWeekdayDates.js";
export * from "./misc/isModuleThisWeek.js";
export * from "./misc/ellipsify.js";

export const [CHROME, SAFARI, EDGE, FIREFOX] = [0, 1, 2, 3];
export const [DEFAULT, CLEAR_TIMETABLE, COPY, CUSTOMIZE] = [0, 1, 2, 3];
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

const getLuminosity = (color = "#000000") => {
  const [rL, gL, bL] = color
    .substring(1)
    .match(/.{1,2}/g)
    .map((str) => parseInt(str, 16))
    .map((hex) => {
      let c = hex / 255.0;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
};

export const getTextColor = (bgColor) =>
  getLuminosity(bgColor) > 0.179 ? "#000000" : "#FFFFFF";
