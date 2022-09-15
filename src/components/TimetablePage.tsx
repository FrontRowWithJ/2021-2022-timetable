import React from "react";
import "../css/timetable-page.css";
import { getLeft, defaultSettings, ColorSettings } from "../misc";
import { module } from "../timetableData";
import Lesson from "./Lesson";

interface TimetablePageProps {
  curr: number;
  index: number;
  date: string;
  hour: number;
  tableRef: React.RefObject<HTMLDivElement>;
  schedule: (module | module[])[];
}
const TimetablePage = (props: TimetablePageProps) => {
  const { curr, index, date, hour, schedule, tableRef } = props;
  const cache = localStorage.getItem("color-settings");
  const settings = (
    cache ? JSON.parse(cache) : defaultSettings
  ) as ColorSettings[];
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
                    {...{ lesson, hour, index, currDay, settings }}
                  />
                );
              })
            ) : (
              <Lesson
                {...{ lesson: lessons, hour, index, currDay, settings }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimetablePage;
