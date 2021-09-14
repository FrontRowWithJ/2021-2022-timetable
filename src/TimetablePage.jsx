import React from "react";
import "./css/timetable-page.css";
import { Timetable } from "./timetableData";
import { handleTransitionEnd } from "./util";

const TimetablePage = (props) => {
  const activityColors = [
    { bgColor: "#2929A3", textColor: "white" },//
    { bgColor: "#E8AA14", textColor: "black" },
    { bgColor: "#F5054F", textColor: "white" },
    { bgColor: "#693696", textColor: "white" },//
  ];
  const classes = props.schedule
    .map((cell, i) => {
      if (cell)
        cell.time = `${("" + (9 + i)).padStart(2, "0")}:00 - ${10 + i}:00`;
      return cell;
    })
    .filter((cell) => cell !== undefined);
  return (
    <div
      className="timetable-page-container"
      ref={props.tableRef}
      style={{ left: `${props.index === 0 ? "" : "10"}0%` }}
      onTransitionEnd={(event) => {
        handleTransitionEnd(
          event.target,
          props.index,
          props.curr,
          props.isAnimating,
          props.setCurr,
          props.setTransition,
          props.setAnimation
        );
      }}
    >
      <div className="date">{props.date}</div>
      {classes.map((lesson, i) => {
        const { bgColor, textColor } = activityColors[lesson.activity];
        const { module, isOnline, activity, time, classroom } = lesson;
        return (
          <div
            key={i}
            className="cell"
            style={{
              boxShadow: "0px 7px 13px -7px " + bgColor,
              color: textColor,
            }}
          >
            <div
              className="online-indicator"
              style={{ background: isOnline ? "#00FF00" : "#FF0000" }}
            ></div>
            <div className="test-0" style={{ backgroundColor: bgColor }}></div>
            <div className="test-1" style={{ backgroundColor: bgColor }}></div>
            <div className="bg" style={{ backgroundColor: bgColor }}>
              <div>{module}</div>
              <div>{Timetable.ACTIVITIES[activity]}</div>
              <div>{time}</div>
              <div>Classroom: {classroom}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimetablePage;
