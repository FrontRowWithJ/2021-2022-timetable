import React, { useState, useRef, useEffect, TouchEvent } from "react";
import "../css/timetable.css";
import TimetablePage from "./TimetablePage";

import {
  getWeekDayDates,
  getLeft,
  setScrollBar,
  isTouchEvent,
  getEvent,
  isPinching,
  Event,
} from "../misc";
import { TimetableData } from "../timetableData";

const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = `${d}px`);

interface TimetableProps {
  isTransitioning: boolean;
  next: number;
  curr: number;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  setSwiping: React.Dispatch<React.SetStateAction<boolean>>;
  tableRefs: React.RefObject<HTMLDivElement>[];
  timetableJSON: TimetableData;
  isSwiping: boolean;
}

const Timetable = (props: TimetableProps) => {
  const { isTransitioning, next, curr, setCurr, setSwiping } = props;
  const timetbaleRef = useRef<HTMLDivElement>(null);
  const [hour, setHour] = useState(new Date().getHours());
  const dates = getWeekDayDates();
  const [start, setStart] = useState<{ x: number; y: number; t: number }>();
  const [delta, setDelta] = useState<{ x: number; y: number }>();
  const [isScrolling, setScrolling] = useState<boolean>();

  useEffect(() => {
    timetbaleRef.current && (timetbaleRef.current.scrollTop = 0);

    props.tableRefs.forEach(
      (ref, i) => ref.current && (ref.current.style.left = getLeft(i, next))
    );
  }, [next, props.tableRefs]);

  useEffect(() => {
    setScrollBar(props.tableRefs[curr].current);
    const iid = setInterval(() => {
      setHour(new Date().getHours());
    }, 1000);
    return () => clearInterval(iid);
  }, [curr, props.tableRefs]);

  useEffect(() => {
    const handleResize = () =>
      setScrollBar(props.tableRefs[curr].current);
    document.addEventListener("resize", handleResize);
    return () => document.removeEventListener("resize", handleResize);
  }, [props.tableRefs, curr]);

  const startSwipe = (evt: Event) => {
    if (isTransitioning) return;
    const { pageX, pageY } = getEvent(evt);
    setStart({ x: pageX, y: pageY, t: +new Date() });
    setSwiping(true);
  };

  const moveSwipe = (event: Event) => {
    if (!start) return;
    if (isTouchEvent(event) && isPinching(event as TouchEvent)) return;
    const evt = getEvent(event);
    const { pageX, pageY } = evt;
    const d = { x: pageX - start.x, y: pageY - start.y };
    setDelta(d);
    const refs = props.tableRefs;
    const [l, m, r] = [-1, 0, 1].map((i) => refs[curr + i]?.current);
    const w = timetbaleRef.current?.clientWidth as number;
    if (isScrolling === undefined)
      setScrolling(!!(isScrolling || Math.abs(d.x) < Math.abs(d.y)));
    if (!isScrolling) {
      refs.forEach(
        (ref) => ref.current && (ref.current.style.transitionDuration = "0ms")
      );
      [l, m, r].forEach((e, i) =>
        translate(e as HTMLDivElement, [-w, 0, w][i] + d.x)
      );
    }
  };

  const endSwipe = () => {
    if (!start) return;
    if (!delta) {
      setStart(undefined);
      setScrolling(undefined);
      return;
    }
    const refs = props.tableRefs;
    refs.forEach(
      (ref) => ref.current && (ref.current.style.transitionDuration = "")
    );
    if (timetbaleRef.current) {
      const w = timetbaleRef.current.clientWidth;
      const duration = +new Date() - start.t;
      const absX = Math.abs(delta.x);
      const isValidSwipe = (duration < 250 && absX > 20) || absX > w / 2;
      const l = curr ? refs[curr - 1].current : undefined;
      const m = refs[curr].current;
      const r = curr !== 4 ? refs[curr + 1].current : undefined;
      setTimeout(() => setSwiping(false), 600);
      if (!isScrolling) {
        if (isValidSwipe) {
          const direction = absX / delta.x;
          const pos =
            direction < 0
              ? [2 * -w, +(curr !== 4) * -w, 0]
              : [0, +(curr !== 0) * w, 2 * w];
          [l, m, r].forEach((elem, i) => elem && translate(elem, pos[i]));
          const newCurr =
            direction < 0 ? (r ? curr + 1 : curr) : l ? curr - 1 : curr;
          setCurr(newCurr);
          if (curr !== newCurr)
            setScrollBar(refs[newCurr].current);
        } else
          [l, m, r].forEach(
            (elem, i) => elem && translate(elem, [-w, 0, w][i])
          );
      }
      setDelta(undefined);
      setStart(undefined);
      setScrolling(undefined);
    }
  };

  return (
    <div
      ref={timetbaleRef}
      className="timetable-container"
      onMouseDown={startSwipe}
      onMouseMove={moveSwipe}
      onMouseUp={endSwipe}
      onTouchStart={startSwipe}
      onTouchMove={moveSwipe}
      onTouchEnd={endSwipe}
    >
      {Object.keys(props.timetableJSON).map((entry, i) => (
        <TimetablePage
          tableRef={props.tableRefs[i]}
          key={i}
          schedule={props.timetableJSON[entry as keyof TimetableData]}
          index={i}
          curr={curr}
          date={dates[i]}
          hour={hour}
        />
      ))}
    </div>
  );
};

export default Timetable;
