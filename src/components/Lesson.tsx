import { isModuleOnThisWeek, ACTIVITIES, ColorSettings } from "../misc";
import { module } from "../timetableData";

const between = (x = 0, min = 0, max = 0) => x >= min && x < max;
const toNum = (s: string) => parseInt(s.substring(0, 2));
const getTimeRange = (s: string) => s.match(/[0-9]+:/g)?.map(toNum);

interface LessonProps {
  index: number;
  currDay: number;
  hour: number;
  lesson: module;
  settings: ColorSettings[];
}

const Lesson = ({ lesson, hour, index, currDay, settings }: LessonProps) => {
  const bgColor = settings[lesson.activity].color;
  const textColor = settings[lesson.activity].txtColor;
  const { module, activity, time, classroom, activePeriods } = lesson;
  const [start, end] = getTimeRange(time) as [number, number];
  const opacity =
    index === currDay &&
    between(hour, start, end) &&
    isModuleOnThisWeek(activePeriods)
      ? 1
      : 0.5;
  return (
    <div
      className="cell"
      draggable={false}
      style={{
        boxShadow: "0px 7px 13px -7px " + bgColor,
        color: textColor,
        opacity,
        height: `${(end - start) * 8}rem`,
      }}
    >
      <div className="bottom-0" style={{ backgroundColor: bgColor }}></div>
      <div className="bottom-1" style={{ backgroundColor: bgColor }}></div>
      <div
        draggable={false}
        className="bg"
        style={{ backgroundColor: bgColor }}
      >
        <div draggable={false}>{module}</div>
        <div draggable={false}>Classroom: {classroom}</div>
        <div draggable={false}>{time}</div>
        <div draggable={false}>{ACTIVITIES[activity]}</div>
      </div>
    </div>
  );
};

export default Lesson;
