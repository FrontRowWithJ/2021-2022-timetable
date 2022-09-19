import { LessonSpacerProps } from "./types";

const LessonSpacer = ({ time }: LessonSpacerProps) => {
  const backgroundColor = "#969696";
  const height = "2rem";
  const boxShadow = `0px 7px 13px -7px ${backgroundColor}`;
  return (
    <div className="cell" style={{ height, boxShadow }}>
      <div className="bottom-0" style={{ backgroundColor }}></div>
      <div className="bottom-1" style={{ backgroundColor }}></div>
      <div className="bg" style={{ backgroundColor }}>
        <div></div>
        <div></div>
        <div>{time}</div>
        <div></div>
      </div>
    </div>
  );
};

export default LessonSpacer;
