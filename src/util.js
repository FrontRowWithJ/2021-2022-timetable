import { times } from "lodash";
import { useEffect } from "react";
const toggleClass = (elem) => elem.classList.toggle("slide-horizontally");

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
    const parent = elem.parentElement;
    const { bottom } = elem.getBoundingClientRect();
    const canScroll =
      bottom > (window.innerHeight || document.documentElement.clientHeight);
    parent.style.overflowY = canScroll ? "" : "hidden";
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

const DAY_IN_MILLISECONDS = 86_400_000;
export const getWeekDayDates = () => {
  const today = new Date().getDay();
  const offset = (1 - today) * DAY_IN_MILLISECONDS;
  const monday = Date.now() + offset;
  return times(5, (i) => new Date(monday + DAY_IN_MILLISECONDS * i)).map(
    getDateString
  );
};

const getDateString = (date = new Date()) => {
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
