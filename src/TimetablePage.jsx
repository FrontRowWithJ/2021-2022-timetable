import React, { useEffect, useCallback } from "react";
import "./css/timetable-page.css";
import { Timetable } from "./timetableData";
import {
  activityColors,
  getTimeRange,
  between,
  setScrollBar,
  getLeft,
} from "./util";

const TimetablePage = (props) => {
  const { refs, curr, index, date, hour, schedule, tableRef } = props;
  const currDay = new Date().getDay() - 1;
  const classes = schedule
    .map((cell, i) => {
      if (cell)
        cell.time = `${("" + (9 + i)).padStart(2, "0")}:00 - ${10 + i}:00`;
      return cell;
    })
    .filter((cell) => cell !== undefined);
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
    >
      <div className="date">{date}</div>
      {classes.map((lesson, i) => {
        const { bgColor, textColor } = activityColors[lesson.activity];
        const { module, isOnline, activity, time, classroom } = lesson;
        const [start, end] = getTimeRange(time);
        const opacity =
          between(hour, start, end) && index === currDay ? 1 : 0.5;
        return (
          <div
            key={i}
            className="cell"
            style={{
              boxShadow: "0px 7px 13px -7px " + bgColor,
              color: textColor,
              opacity: opacity,
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
            <div className="bg" style={{ backgroundColor: bgColor }}>
              <div>{module}</div>
              <div>Classroom: {classroom}</div>
              <div>{time}</div>
              <div>{Timetable.ACTIVITIES[activity]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimetablePage;
