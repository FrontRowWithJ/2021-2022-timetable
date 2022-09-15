import React, { useState } from "react";
import Header from "./Header";
import Timetable from "./Timetable";
import { setScrollBar, canScroll, DEFAULT, times } from "../misc";
import { TimetableData } from "../timetableData";

interface TimetableWebpageProps {
  timetableJSON: TimetableData;
  overlay: 0 | 1;
  setOverlay: React.Dispatch<React.SetStateAction<0 | 1>>;
}

const TimetableWebpage = ({
  timetableJSON,
  setOverlay,
  overlay,
}: TimetableWebpageProps) => {
  const day = new Date().getDay() - 1;
  const [curr, setCurr] = useState(day < 0 || day > 4 ? 0 : day);
  const [next, setNext] = useState(curr);
  const [isTransitioning, setTransition] = useState(false);
  const [isSwiping, setSwiping] = useState(false);
  const [count, setCount] = useState(0);
  const tableRefs = times(5, () => React.createRef<HTMLDivElement>());

  return (
    <main
      style={{
        filter: overlay === DEFAULT ? "" : "blur(10px)",
        height: "100%",
      }}
      onWheel={({ deltaY }) => {
        const innerH =
          window.innerHeight || document.documentElement.clientHeight;
        const e = tableRefs[curr].current as HTMLDivElement;
        const { bottom } = e.getBoundingClientRect();
        if (canScroll(e) && innerH !== (bottom | 0)) {
          setTransition(true);
          setCount && setCount(0);
          return setTimeout(() => setTransition(false), 100);
        } else if (count < 7) return setCount(count + 1);
        if (!isTransitioning && !isSwiping) {
          const newNext = deltaY > 0 ? curr + 1 : curr - 1;
          if (newNext === -1 || newNext === 5) return;
          setNext(newNext);
          setTransition(true);
          setTimeout(() => {
            setCurr(newNext);
            setScrollBar(tableRefs[newNext].current);
            setTransition(false);
          }, 300);
        }
      }}
    >
      <Header
        {...{
          setNext,
          isTransitioning,
          setTransition,
          curr,
          setCurr,
          isSwiping,
          setOverlay,
          timetableJSON,
        }}
        setNext={setNext}
        isTransitioning={isTransitioning}
        setTransition={setTransition}
        curr={curr}
        setCurr={setCurr}
        isSwiping={isSwiping}
        setOverlay={setOverlay}
        timetableJSON={timetableJSON}
      />
      <Timetable
        timetableJSON={timetableJSON}
        tableRefs={tableRefs}
        next={next}
        curr={curr}
        setCurr={setCurr}
        isTransitioning={isTransitioning}
        isSwiping={isSwiping}
        setSwiping={setSwiping}
      />
    </main>
  );
};

export default TimetableWebpage;
