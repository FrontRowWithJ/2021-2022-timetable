import React, { useEffect, useCallback } from "react";
import "./css/timetable-page.css";
import { setScrollBar, getLeft } from "./util";
import Lesson from "./Lesson";

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
                  />
                );
              })
            ) : (
              <Lesson
                lesson={lessons}
                hour={hour}
                index={index}
                currDay={currDay}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimetablePage;
