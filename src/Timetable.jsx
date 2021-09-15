import React, { useState, useRef, useEffect } from "react";
import "./css/timetable.css";
import { times } from "lodash";
import TimetablePage from "./TimetablePage";
import timetableJSON from "./timetableData";
import {
  getWeekDayDates,
  today,
  HOUR_IN_MILLISECONDS,
  getLeft,
  toggle,
} from "./util";

const translate = (elem, dist, width) => {
  if (elem) elem.style.left = dist + "px";
};

const Timetable = ({ isTransitioning, setTransition, next, curr, setCurr }) => {
  const [hour, setHour] = useState(today.getHours());
  const tillNextHour = 60 - today.getMinutes();
  const tableRefs = useRef(times(5, () => React.createRef()));
  const dates = getWeekDayDates();
  const [start, setStart] = useState(undefined);
  const [delta, setDelta] = useState(undefined);
  useEffect(() => {
    tableRefs.current.forEach((ref, i) => {
      ref.current.style.left = getLeft(i, next);
    });
  }, [next]);
  useEffect(() => {
    setTimeout(() => {
      setInterval(() => {
        setHour(today.getHours());
      }, HOUR_IN_MILLISECONDS);
    }, tillNextHour * 60 * 1000);
  }, [tillNextHour]);

  const startSwipe = ({ pageX }) => {
    setStart({ x: pageX, t: +new Date() });
  };

  const moveSwipe = ({ pageX }) => {
    const d = pageX - start.x;
    setDelta(d);
    const refs = tableRefs.current;
    refs.forEach((ref) => (ref.current.style.transitionDuration = "0ms"));
    const l = curr ? refs[curr - 1].current : undefined;
    const m = refs[curr].current;
    const r = curr !== 4 ? refs[curr + 1].current : undefined;
    const w = document.getElementsByClassName("timetable-container")[0]
      .clientWidth;
    translate(l, -w + d, w);
    translate(m, d, w);
    translate(r, w + d, w);
  };

  const endSwipe = () => {
    // tableRefs.current.forEach((ref) => toggle(ref.current));
    tableRefs.current.forEach(
      (ref) => (ref.current.style.transitionDuration = "")
    );
    const w = document.getElementsByClassName("timetable-container")[0]
      .clientWidth;
    const duration = +new Date() - start.t;
    const isValidSwipe =
      (duration < 250 && delta > 20) || Math.abs(delta) > w / 2;
    const refs = tableRefs.current;
    const l = curr ? refs[curr - 1].current : undefined;
    const m = refs[curr].current;
    const r = curr !== 4 ? refs[curr + 1].current : undefined;
    if (isValidSwipe) {
      const direction = Math.abs(delta) / delta;
      const pos =
        direction < 0
          ? [2 * -w, (curr !== 4) * -w, 0]
          : [0, (curr !== 0) * w, 2 * w];
      [l, m, r].forEach((elem, i) => translate(elem, pos[i], w));
      if (direction < 0) setCurr(r ? curr + 1 : curr);
      else setCurr(l ? curr - 1 : curr);
    } else {
      const pos = [-w, 0, w];
      [l, m, r].forEach((elem, i) => translate(elem, pos[i], w));
    }
    setStart(undefined);
  };
  return (
    <div
      className="timetable-container"
      onMouseDown={(event) => startSwipe(event)}
      onMouseMove={(event) => start && moveSwipe(event)}
      onMouseUp={() => endSwipe()}
    >
      {Object.keys(timetableJSON).map((entry, i) => (
        <TimetablePage
          tableRef={tableRefs.current[i]}
          key={i}
          schedule={timetableJSON[entry]}
          setCurr={setCurr}
          setTransition={setTransition}
          index={i}
          curr={curr}
          next={next}
          date={dates[i]}
          hour={hour}
          isTransitioning={isTransitioning}
        />
      ))}
    </div>
  );
};

export default Timetable;
