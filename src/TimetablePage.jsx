import React, { useEffect } from "react";
import "./css/timetable-page.css";
import { Timetable } from "./timetableData";
import {
  activityColors,
  getTimeRange,
  between,
  setScrollBar,
  today,
  getLeft,
} from "./util";

const TimetablePage = (props) => {
  const currDay = today.getDay() - 1;
  const classes = props.schedule
    .map((cell, i) => {
      if (cell)
        cell.time = `${("" + (9 + i)).padStart(2, "0")}:00 - ${10 + i}:00`;
      return cell;
    })
    .filter((cell) => cell !== undefined);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const elem = document.getElementsByClassName("timetable-page-container")[
        props.curr
      ];
      setScrollBar(elem);
    });
  }, [props.curr]);
  return (
    <div
      className="timetable-page-container"
      ref={props.tableRef}
      style={{ left: getLeft(props.index, props.curr) }}
      onTransitionEnd={() => {
        const { isTransitioning, setCurr, next, setTransition } = props;
        if (isTransitioning) {
          setCurr(next);
          setScrollBar(document.getElementsByClassName("timetable-page-container")[next]);
          setTransition(false);
        }
      }}
    >
      <div className="date">{props.date}</div>
      {classes.map((lesson, i) => {
        const { bgColor, textColor } = activityColors[lesson.activity];
        const { module, isOnline, activity, time, classroom } = lesson;
        const [start, end] = getTimeRange(time);
        const opacity =
          between(props.hour, start, end) && props.index === currDay ? 1 : 0.5;
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
            <div className="test-0" style={{ backgroundColor: bgColor }}></div>
            <div className="test-1" style={{ backgroundColor: bgColor }}></div>
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
