import React, { useState, useRef, useEffect } from "react";
import "./css/timetable.css";
import { times } from "lodash";
import TimetablePage from "./TimetablePage";
import timetableJSON from "./timetableData";
import { getWeekDayDates, getLeft, setScrollBar } from "./util";

const translate = (e, d) => e && (e.style.left = d + "px");
const isMouseEvent = (event) => /[Mm]ouse/i.test(event._reactName);
const getEvent = (event) => (isMouseEvent(event) ? event : event.touches[0]);

const Timetable = (props) => {
  const { isTransitioning, setTransition, next, curr, setCurr, setSwiping } =
    props;
  const timetbaleRef = useRef(null);
  const [hour, setHour] = useState(new Date().getHours());
  const tableRefs = useRef(times(5, () => React.createRef()));
  const dates = getWeekDayDates();
  const [start, setStart] = useState(undefined);
  const [delta, setDelta] = useState(undefined);
  const [isScrolling, setScrolling] = useState(undefined);
  useEffect(() => {
    timetbaleRef.current.scrollTop = 0;
    tableRefs.current.forEach((ref, i) => {
      ref.current.style.left = getLeft(i, next);
    });
  }, [next]);
  useEffect(() => {
    setScrollBar(tableRefs.current[curr].current);
    const iid = setInterval(() => {
      setHour(new Date().getHours());
    }, 1000);
    return () => clearInterval(iid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSwipe = (event) => {
    if (isTransitioning) return;
    const { pageX, pageY } = getEvent(event);
    setStart({ x: pageX, y: pageY, t: +new Date() });
    setSwiping(true);
  };

  const moveSwipe = (event) => {
    if (!start) return;
    if (!isMouseEvent(event))
      if (event.touches.length > 1 || (event.scale && event.scale !== 1))
        return;
    const evt = getEvent(event);
    const { pageX, pageY } = evt;
    const d = { x: pageX - start.x, y: pageY - start.y };
    setDelta(d);
    const refs = tableRefs.current;
    const l = curr ? refs[curr - 1].current : undefined;
    const m = refs[curr].current;
    const r = curr !== 4 ? refs[curr + 1].current : undefined;
    const w = timetbaleRef.current.clientWidth;
    if (isScrolling === undefined)
      setScrolling(!!(isScrolling || Math.abs(d.x) < Math.abs(d.y)));
    if (!isScrolling) {
      refs.forEach((ref) => (ref.current.style.transitionDuration = "0ms"));
      [l, m, r].forEach((e, i) => translate(e, [-w, 0, w][i] + d.x));
    }
  };

  const endSwipe = () => {
    if (!start) return;
    if (!delta) return;
    const refs = tableRefs.current;
    refs.forEach((ref) => (ref.current.style.transitionDuration = ""));
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
            ? [2 * -w, (curr !== 4) * -w, 0]
            : [0, (curr !== 0) * w, 2 * w];
        [l, m, r].forEach((elem, i) => translate(elem, pos[i]));
        let newCurr;
        if (direction < 0) newCurr = r ? curr + 1 : curr;
        else newCurr = l ? curr - 1 : curr;
        setCurr(newCurr);
        if (curr !== newCurr) setScrollBar(refs[newCurr].current);
      } else {
        const pos = [-w, 0, w];
        [l, m, r].forEach((elem, i) => translate(elem, pos[i]));
      }
    }
    setStart(undefined);
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
          isSwiping={props.isSwiping}
          setSwiping={setSwiping}
          refs={tableRefs.current}
        />
      ))}
    </div>
  );
};

export default Timetable;
