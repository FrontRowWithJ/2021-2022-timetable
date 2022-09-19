import { isModuleOnThisWeek, ACTIVITIES } from "../../misc";
import { getTimeRange, between } from "./functions";
import { LessonProps } from "./types";
import "./lesson.css"

const Lesson = ({ lesson, hour, index, currDay, settings }: LessonProps) => {
  const { backgroundColor } = settings[lesson.activity];
  const { color } = settings[lesson.activity];
  const { module, activity, time, classroom, activePeriods } = lesson;
  const [start, end] = getTimeRange(time) as [number, number];
  const opacity =
    index === currDay &&
    between(start, hour, end) &&
    isModuleOnThisWeek(activePeriods)
      ? 1
      : .5;
  const height = `${(end - start) * 8}rem`;
  const boxShadow = `0px 7px 13px -7px ${backgroundColor}`;
  return (
    <div
      className="cell noselect"
      style={{ boxShadow, color, opacity, height }}
    >
      <div className="bottom-0" style={{ backgroundColor }}></div>
      <div className="bottom-1" style={{ backgroundColor }}></div>
      <div className="bg noselect" style={{ backgroundColor }}>
        <div>{module}</div>
        <div>Classroom: {classroom}</div>
        <div>{time}</div>
        <div>{ACTIVITIES[activity]}</div>
      </div>
    </div>
  );
};

export default Lesson;
