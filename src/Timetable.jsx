import React, { useState, useRef, useEffect } from "react";
import "./css/timetable.css";
import { times } from "lodash";
import TimetablePage from "./TimetablePage";
import timetableJSON from "./timetableData";
import { useAnimation, getWeekDayDates, today } from "./util";

const Timetable = ({ isTransitioning, setTransition, next, curr, setCurr }) => {
  const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
  const [hour, setHour] = useState(today.getHours());
  const tillNextHour = 60 - today.getMinutes();
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

  useEffect(() => {
    setTimeout(() => {
      setInterval(() => {
        setHour(today.getHours());
      }, HOUR_IN_MILLISECONDS);
    }, tillNextHour * 60 * 1000);
  });
  
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
          hour={hour}
        />
      ))}
    </div>
  );
};

export default Timetable;
