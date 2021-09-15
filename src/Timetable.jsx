import React, { useState, useRef } from "react";
import "./css/timetable.css";
import { times } from "lodash";
import TimetablePage from "./TimetablePage";
import timetableJSON from "./timetableData";
import { useAnimation, getWeekDayDates } from "./util";

const Timetable = ({ isTransitioning, setTransition, next, curr, setCurr }) => {
  const [isAnimating, setAnimation] = useState(false);
  const tableRefs = useRef(times(5, () => React.createRef()));
  const dates = getWeekDayDates();
  useAnimation(
    isTransitioning,
    isAnimating,
    next,
    curr,
    setAnimation,
    tableRefs.current,
    setTransition
  );
  return (
    <div className="timetable-container">
      {Object.keys(timetableJSON).map((entry, i) => (
        <TimetablePage
          tableRef={tableRefs.current[i]}
          key={entry}
          schedule={timetableJSON[entry]}
          setCurr={setCurr}
          setTransition={setTransition}
          setAnimation={setAnimation}
          isAnimating={isAnimating}
          index={i}
          curr={curr}
          date={dates[i]}
        />
      ))}
    </div>
  );
};

export default Timetable;
