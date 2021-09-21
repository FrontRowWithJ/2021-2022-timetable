import React, { useEffect, useCallback } from "react";
import "./css/timetable-page.css";
import { Timetable } from "./timetableData";
import { setScrollBar, getLeft } from "./util";

const activityColors = [
  { bgColor: "#2929A3", textColor: "white" },
  { bgColor: "#E8AA14", textColor: "black" },
  { bgColor: "#F5054F", textColor: "white" },
  { bgColor: "#693696", textColor: "white" },
];
const between = (x = 0, min = 0, max = 0) => x >= min && x < max;
const toNum = (s) => parseInt(s.substring(0, 2));
const getTimeRange = (s) => s.match(/[0-9]+:/g).map(toNum);
const TimetablePage = (props) => {
  const { refs, curr, index, date, hour, schedule, tableRef } = props;
  const currDay = new Date().getDay() - 1;
  const classes = schedule.filter((cell) => cell !== undefined);
  const handleResize = useCallback(
    () => setScrollBar(refs[curr].current),
    [curr, refs]
  );
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
  return (
    <div
      className="timetable-page-container"
      ref={tableRef}
      style={{ left: getLeft(index, curr) }}
      draggable={false}
    >
      <div draggable={false} className="date">
        {date}
      </div>
      {classes.map((lesson, i) => {
        const { bgColor, textColor } = activityColors[lesson.activity];
        const { module, isOnline, activity, time, classroom } = lesson;
        const [start, end] = getTimeRange(time);
        const opacity =
          between(hour, start, end) && index === currDay ? 1 : 0.3;
        return (
          <div
            key={i}
            className="cell"
            draggable={false}
            style={{
              boxShadow: "0px 7px 13px -7px " + bgColor,
              color: textColor,
              opacity: opacity,
              height: `${(end - start) * 6}rem`,
            }}
          >
            <div
              className="online-indicator"
              style={{ background: isOnline ? "#00FF00" : "red" }}
            ></div>
            <div
              className="bottom-0"
              style={{ backgroundColor: bgColor }}
            ></div>
            <div
              className="bottom-1"
              style={{ backgroundColor: bgColor }}
            ></div>
            <div
              draggable={false}
              className="bg"
              style={{ backgroundColor: bgColor }}
            >
              <div draggable={false}>{module}</div>
              <div draggable={false}>Classroom: {classroom}</div>
              <div draggable={false}>{time}</div>
              <div draggable={false}>{Timetable.ACTIVITIES[activity]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimetablePage;
