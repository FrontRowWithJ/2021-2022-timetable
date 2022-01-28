import React, { useState, useRef } from "react";
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
  CLEAR_TIMETABLE,
  COPY,
  CUSTOMIZE,
} from "../misc";

const TimetableWebpage = ({ timetableJSON, setOverlay, setUrl }) => {
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
      <Menu>
        <MenuItem
          isReady
          text={"Generate URL for Mobile"}
          onclick={() => {
            const base64 = compressTimetable(timetableJSON, "Base64");
            const url = `${getBaseURL()}?timetable=${base64ToURLSafe(base64)}`;
            setUrl(url);
            setOverlay(COPY);
          }}
        />
        <MenuItem
          text={"Enable Notifications"}
          onclick={() => {
            subscribeToNotifications();
          }}
        />
        <MenuItem
          text={"Customize"}
          onclick={() => {
            setOverlay(CUSTOMIZE);
          }}
        />
        <MenuItem
          isReady
          text={"Reset Timetable"}
          onclick={() => setOverlay(CLEAR_TIMETABLE)}
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
