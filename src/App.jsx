import React, { useState, useRef } from "react";
import Header from "./Header";
import "./css/app.css";
import Timetable from "./Timetable";
import { setScrollBar, canScroll } from "./util";
const App = () => {
  const day = new Date().getDay() - 1;
  const [curr, setCurr] = useState(day < 0 || day > 4 ? 0 : day);
  const [next, setNext] = useState(curr);
  const [isTransitioning, setTransition] = useState(false);
  const [isSwiping, setSwiping] = useState(false);
  const [count, setCount] = useState(0);
  const tableRefs = useRef([0, 0, 0, 0, 0].map(React.createRef));
  return (
    <main
      onWheel={({ deltaY }) => {
        const innerH =
          window.innerHeight || document.documentElement.clientHeight;
        const e = tableRefs.current[curr].current;
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
            const e = tableRefs.current[newNext].current;
            setScrollBar(e);
            setTransition(false);
          }, 300);
        }
      }}
    >
      <Header
        setNext={setNext}
        isTransitioning={isTransitioning}
        setTransition={setTransition}
        curr={curr}
        setCurr={setCurr}
        isSwiping={isSwiping}
      />
      <Timetable
        tableRefs={tableRefs}
        next={next}
        curr={curr}
        setCurr={setCurr}
        isTransitioning={isTransitioning}
        setTransition={setTransition}
        isSwiping={isSwiping}
        setSwiping={setSwiping}
      />
    </main>
  );
};

export default App;
