import React, { useState } from "react";
import Header from "../Header";
import Timetable from "../Timetable";
import { times } from "../../misc";
import { TimetableWebpageProps } from "./types";
import { overlayType } from "../Overlay";

const TimetableWebpage = ({
  timetableData,
  setOverlay,
  overlay,
}: TimetableWebpageProps) => {
  const day = new Date().getDay() - 1;
  const [curr, setCurr] = useState(day < 0 || day > 4 ? 0 : day);
  const [isTransitioning, setTransition] = useState(false);
  const [isSwiping, setSwiping] = useState(false);
  const [count, setCount] = useState(0);
  const tableRefs = times(5, React.createRef<HTMLDivElement>);
  const filter = overlay === overlayType.DEFAULT ? "" : "blur(10px)";
  return (
    <main
      style={{ filter, height: "100%" }}
      onWheel={({ deltaY }) => {
        const { current: e } = tableRefs[curr];
        if (e) {
          const { height } = e.getBoundingClientRect();
          const isAtTop = e.scrollTop === 0;
          const y = Math.round(e.scrollHeight - height);
          const isAtBottom = y === e.scrollTop;
          const isDoneScrolling =
            (isAtTop && deltaY < 0) || (isAtBottom && deltaY > 0);
          setCount((count) => count + 1);
          if (count === 1) setTimeout(() => setCount(0), 600);
          if (isDoneScrolling && count === 15) {
            const newNext = deltaY > 0 ? curr + 1 : curr - 1;
            if (newNext === -1 || newNext === 5) return;
            setTransition(true);
            setCurr(newNext);
            setTimeout(() => setTransition(false), 600);
          }
        }
      }}
    >
      <Header
        {...{ isTransitioning, setTransition, curr, setCurr }}
        {...{ isSwiping, setOverlay, timetableData }}
      />
      <Timetable
        {...{ timetableData, tableRefs, curr, setCurr, isTransitioning }}
        {...{ isSwiping, setSwiping }}
      />
    </main>
  );
};

export default TimetableWebpage;
