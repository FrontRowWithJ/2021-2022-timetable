import React, { useState } from "react";
import Header from "./Header";
import "./css/app.css";
import Timetable from "./Timetable";
import { setScrollBar } from "./util";
const App = () => {
  const day = new Date().getDay() - 1;
  const [curr, setCurr] = useState(day < 0 || day > 4 ? 0 : day);
  const [next, setNext] = useState(curr);
  const [isTransitioning, setTransition] = useState(false);
  const [isSwiping, setSwiping] = useState(false);
  return (
    <main
      onWheel={({ deltaY }) => {
        if (!isTransitioning && !isSwiping) {
          const isRight = deltaY > 0;
          let newNext;
          if (isRight) {
            if (curr === 4) return;
            newNext = curr + 1;
          } else {
            if (curr === 0) return;
            newNext = curr - 1;
          }
          setNext(newNext);
          setTransition(true);
          setTimeout(() => {
            setCurr(newNext);
            const elem = document.getElementsByClassName(
              "timetable-page-container"
            )[newNext];
            setScrollBar(elem);
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
