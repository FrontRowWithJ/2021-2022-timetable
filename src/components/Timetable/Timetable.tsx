import React, { useState, useRef, useEffect, TouchEvent } from "react";
import "./timetable.css";
import TimetablePage from "../TimetablePage";

import {
  getWeekDayDates,
  isTouchEvent,
  getEvent,
  isPinching,
  Event,
} from "../../misc";
import { TimetableData } from "../../timetableData";
import { TimetableProps } from "./types";
import { translate } from "./functions";

const Timetable = (props: TimetableProps) => {
  const { isTransitioning, curr, setCurr, setSwiping } = props;
  const timetableRef = useRef<HTMLDivElement>(null);
  const [hour, setHour] = useState(new Date().getHours());
  const dates = getWeekDayDates();
  const [start, setStart] = useState<{ x: number; y: number; t: number }>();
  const [delta, setDelta] = useState<{ x: number; y: number }>();
  const [isScrolling, setScrolling] = useState<boolean>();

  useEffect(() => {
    const iid = setInterval(() => {
      setHour(new Date().getHours());
    }, 1000);
    return () => clearInterval(iid);
  }, [curr, props.tableRefs]);

  const startSwipe = (evt: Event) => {
    if (isTransitioning) return;
    const { pageX, pageY } = getEvent(evt);
    setStart({ x: pageX, y: pageY, t: +new Date() });
    setSwiping(true);
  };

  const moveSwipe = (event: Event) => {
    if (!start) return;
    if (isTouchEvent(event) && isPinching(event as TouchEvent)) return;
    const { pageX, pageY } = getEvent(event);
    const d = { x: pageX - start.x, y: pageY - start.y };
    setDelta(d);
    const refs = props.tableRefs;
    const [l, m, r] = [-1, 0, 1].map((i) => refs[curr + i]?.current);
    const w = timetableRef.current?.clientWidth as number;
    if (isScrolling === undefined)
      setScrolling(!!(isScrolling || Math.abs(d.x) < Math.abs(d.y)));
    if (!isScrolling) {
      refs.forEach(
        (ref) => ref.current && (ref.current.style.transitionDuration = "0ms")
      );
      [l, m, r].forEach((e, i) => e && translate(e, [-w, 0, w][i] + d.x));
    }
  };

  const endSwipe = () => {
    setTimeout(() => setSwiping(false), 600);
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
    if (timetableRef.current) {
      const w = timetableRef.current.clientWidth;
      const duration = +new Date() - start.t;
      const absX = Math.abs(delta.x);
      const isValidSwipe = (duration < 250 && absX > 20) || absX > w / 2;
      const l = curr ? refs[curr - 1].current : undefined;
      const m = refs[curr].current;
      const r = curr !== 4 ? refs[curr + 1].current : undefined;
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
        } else [l, m, r].forEach((e, i) => e && translate(e, [-w, 0, w][i]));
      }
      setDelta(undefined);
      setStart(undefined);
      setScrolling(undefined);
    }
  };

  return (
    <div
      ref={timetableRef}
      className="timetable-container"
      onMouseDown={startSwipe}
      onMouseMove={moveSwipe}
      onMouseUp={endSwipe}
      onTouchStart={startSwipe}
      onTouchMove={moveSwipe}
      onTouchEnd={endSwipe}
    >
      {Object.keys(props.timetableData).map((entry, index) => (
        <TimetablePage
          tableRef={props.tableRefs[index]}
          key={index}
          schedule={props.timetableData[entry as keyof TimetableData]}
          {...{ curr, hour, date: dates[index], index }}
        />
      ))}
    </div>
  );
};

export default Timetable;
