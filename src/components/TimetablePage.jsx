import React from "react";
import "../css/timetable-page.css";
import { getLeft, defaultSettings } from "../misc";
import Lesson from "./Lesson";

const TimetablePage = (props) => {
  const { curr, index, date, hour, schedule, tableRef } = props;
  const cache = window.localStorage.getItem("color-settings");
  const settings = cache ? JSON.parse(cache) : defaultSettings;
  const currDay = new Date().getDay() - 1;
  const classes = schedule.filter((cell) => cell !== undefined);

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
      {classes.map((lessons, i) => {
        return (
          <div key={i} draggable={false} className="test">
            {Array.isArray(lessons) ? (
              lessons.map((lesson, i) => {
                return (
                  <Lesson
                    key={`${lesson.time}_${lesson.moduleCode}_${i}`}
                    lesson={lesson}
                    hour={hour}
                    index={index}
                    currDay={currDay}
                    settings={settings}
                  />
                );
              })
            ) : (
              <Lesson
                lesson={lessons}
                hour={hour}
                index={index}
                currDay={currDay}
                settings={settings}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimetablePage;
