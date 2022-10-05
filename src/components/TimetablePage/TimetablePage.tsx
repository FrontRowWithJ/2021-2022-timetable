import React from "react";
import "./timetable-page.css";
import { getLeft, defaultSettings, ColorSettings } from "../../misc";

import Lesson from "../Lesson";
import LessonSpacer from "../LessonSpacer";
import { TimetablePageProps } from "./types";
import { hoursInTimeRange, toTime } from "./functions";

const TimetablePage = (props: TimetablePageProps) => {
  const { curr, index, date, hour, schedule, tableRef } = props;
  const cache = localStorage.getItem("color-settings");
  const settings = (
    cache ? JSON.parse(cache) : defaultSettings
  ) as ColorSettings;
  const currDay = new Date().getDay() - 1;
  const classes = schedule.filter((cell) => cell !== undefined);
  const modules = classes.flat();
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17] as const;
  let j = 0;
  const res: JSX.Element[] = [];
  for (const lesson of modules) {
    const lessonTime = +lesson.time.substring(0, 2);
    while (times[j] < lessonTime) res.push(<LessonSpacer time={toTime(j++)} />);
    j += hoursInTimeRange(lesson.time);
    res.push(<Lesson {...{ lesson, hour, index, currDay, settings }} />);
  }
  while (j < times.length) res.push(<LessonSpacer time={toTime(j++)} />);

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
      {res.map((lesson, i) => (
        <div key={`test_${i}`} draggable="true" className="test">
          {lesson}
        </div>
      ))}
    </div>
  );
};

export default TimetablePage;
