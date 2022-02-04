import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Timetable from "./Timetable";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import subscribeToNotifications from "../subscribeNotifications";
import {
  setScrollBar,
  canScroll,
  compressTimetable,
  base64ToURLSafe,
  getBaseURL,
  CUSTOMIZE,
} from "../misc";

const TimetableWebpage = ({ timetableJSON, setOverlay }) => {
  const day = new Date().getDay() - 1;
  const [curr, setCurr] = useState(day < 0 || day > 4 ? 0 : day);
  const [next, setNext] = useState(curr);
  const [isTransitioning, setTransition] = useState(false);
  const [isSwiping, setSwiping] = useState(false);
  const [count, setCount] = useState(0);
  const tableRefs = useRef([0, 0, 0, 0, 0].map(React.createRef));
  const [buttonText, setText] = useState("Copy URL for Mobile");
  const [resetText, setResetText] = useState("Hold To Reset Timetable");
  const variable = useRef(false);
  const resetTimetable = () => {
    window.localStorage.clear();
    window.location.href = window.location.origin;
  };
  useEffect(() => {
    const onmouseup = () => {
      setResetText("Hold To Reset Timetable");
      variable.current = false;
    };
    document.addEventListener("mouseup", onmouseup);
    document.addEventListener("touchend", onmouseup);
    return () => {
      document.removeEventListener("mouseup", onmouseup);
      document.removeEventListener("touchend", onmouseup);
    };
  });
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
      <Menu>
        <MenuItem
          text={buttonText}
          onclick={() => {
            const base64 = compressTimetable(timetableJSON, "Base64");
            const url = `${getBaseURL()}?timetable=${base64ToURLSafe(base64)}`;
            navigator.clipboard.writeText(url).then(() => {
              setText("Copied!");
              setTimeout(() => setText("Copy URL for Mobile"), 600);
            });
          }}
        />
        <MenuItem
          disabled
          text={"Enable Notifications"}
          onclick={() => subscribeToNotifications()}
        />
        <MenuItem
          disabled
          text={"Customize"}
          onclick={() => setOverlay(CUSTOMIZE)}
        />
        <MenuItem
          text={resetText}
          onmousedown={() => {
            variable.current = true;
            setResetText("Resetting");
            setTimeout(
              () => variable.current && setResetText("Resetting."),
              250
            );
            setTimeout(
              () => variable.current && setResetText("Resetting.."),
              500
            );
            setTimeout(
              () => variable.current && setResetText("Resetting..."),
              750
            );
            setTimeout(() => {
              if (variable.current) resetTimetable();
              else setResetText("Hold To Reset Timetable");
            }, 1000);
          }}
        />
      </Menu>
      <Timetable
        timetableJSON={timetableJSON}
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

export default TimetableWebpage;
