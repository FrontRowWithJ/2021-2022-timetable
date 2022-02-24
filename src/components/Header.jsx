import React, { useState, useEffect, useRef } from "react";
import "../css/header.css";
import {
  setScrollBar,
  compressTimetable,
  base64ToURLSafe,
  getBaseURL,
  CUSTOMIZE,
  times,
} from "../misc";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import subscribeToNotifications from "../subscribeNotifications";

const Header = (props) => {
  const { setNext, setTransition, isTransitioning, curr, isSwiping, setCurr } =
    props;

  const [buttonText, setText] = useState("Copy URL for Mobile");
  const [resetText, setResetText] = useState("Hold To Reset Timetable");
  const variable = useRef(false);
  const tid = useRef(0);
  const resetTimetable = () => {
    window.localStorage.clear();
    window.location.href = getBaseURL();
  };

  useEffect(() => {
    const onmouseup = () => {
      setResetText("Hold To Reset Timetable");
      variable.current = false;
      clearTimeout(tid.current);
    };
    document.addEventListener("mouseup", onmouseup);
    document.addEventListener("touchend", onmouseup);
    return () => {
      document.removeEventListener("mouseup", onmouseup);
      document.removeEventListener("touchend", onmouseup);
    };
  }, []);

  return (
    <div id="header">
      <Menu>
        <MenuItem
          text={buttonText}
          onClick={() => {
            const base64 = compressTimetable(props.timetableJSON, "Base64");
            const url = `${getBaseURL()}?timetable=${base64ToURLSafe(base64)}`;
            navigator.clipboard.writeText(url).then(() => {
              setText("Copied!");
              setTimeout(() => setText("Copy URL for Mobile"), 600);
            });
          }}
        />
        <MenuItem
          disabled={!("Notification" in window)}
          text={"Enable Notifications"}
          onClick={() => subscribeToNotifications(props.timetableJSON)}
        />
        <MenuItem
          text={"Customize"}
          onClick={() => props.setOverlay(CUSTOMIZE)}
        />
        <MenuItem
          text={resetText}
          onMouseDown={() => {
            variable.current = true;
            setResetText("Resetting");
            times(3, (i) =>
              setTimeout(
                () => variable.current && setResetText((s) => `${s}.`),
                (i + 1) * 250
              )
            );
            tid.current = setTimeout(() => {
              if (variable.current) resetTimetable();
              else setResetText("Hold To Reset Timetable");
            }, 1000);
          }}
        />
      </Menu>
      {["M", "T", "W", "T", "F"].map((day, i) => {
        return (
          <div
            className="header-button-container"
            key={i}
            onClick={() => {
              if (!isTransitioning && !isSwiping) {
                setNext(i);
                setTransition(true);
                setTimeout(() => {
                  setCurr(i);
                  const elem = document.getElementsByClassName(
                    "timetable-page-container"
                  )[i];
                  setScrollBar(elem);
                  setTransition(false);
                }, 600);
              }
            }}
            style={{ opacity: i !== curr ? 0.3 : 1 }}
          >
            <div
              className="header-button"
              style={{
                cursor: isTransitioning ? "not-allowed" : "pointer",
                backgroundColor: i !== curr ? "white" : "#bbbbbb",
                color: i !== curr ? "black" : "white",
              }}
            >
              {day}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
