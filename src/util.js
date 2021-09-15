import { times } from "lodash";
import { useEffect } from "react";

const toggleClass = (elem) => elem.classList.toggle("slide-horizontally");
export const setScrollBar = (elem) => {
  const parent = elem.parentElement;
  const { bottom } = elem.getBoundingClientRect();
  const canScroll =
    bottom > (window.innerHeight || document.documentElement.clientHeight);
  parent.style.overflowY = canScroll ? "" : "hidden";
};

export const handleTransitionEnd = (
  elem,
  i,
  curr,
  isAnimating,
  setCurr,
  setTransition,
  setAnimation
) => {
  toggleClass(elem);
  if (i !== curr && isAnimating) {
    setCurr(i);
    setTransition(false);
    setAnimation(false);
    setScrollBar(elem);
    [...document.getElementsByClassName("timetable-page-container")].forEach(
      (elem, idx) => {
        elem.style.left = `${idx === i ? "" : "10"}0%`;
      }
    );
  }
};

export const useAnimation = (
  isTransitioning,
  isAnimating,
  next,
  curr,
  setAnimation,
  refs,
  setTransition
) => {
  useEffect(() => {
    if (isTransitioning && !isAnimating && next !== curr) {
      setAnimation(true);
      refs.forEach((ref, i) => {
        ref.current.style.left = `${i === curr ? "" : "10"}0%`;
      });
      const _curr = refs[curr].current;
      const _next = refs[next].current;
      toggleClass(_curr);
      toggleClass(_next);
      _curr.style.left = "-100%";
      _next.style.left = "0%";
    } else if (isTransitioning && next === curr) setTransition(false);
  }, [
    curr,
    next,
    refs,
    setAnimation,
    isTransitioning,
    isAnimating,
    setTransition,
  ]);
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

export const between = (x = 0, min = 0, max = 0) => x >= min && x <= max;
