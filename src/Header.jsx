import React from "react";
import "./css/header.css";
import { setScrollBar } from "./util";
const Header = (props) => {
  const { setNext, setTransition, isTransitioning, curr, isSwiping } = props;
  return (
    <div id="header">
      {["M", "T", "W", "T", "F"].map((day, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              if (!isTransitioning && !isSwiping) {
                setNext(i);
                setTransition(true);
                setTimeout(() => {
                  props.setCurr(i);
                  const elem = document.getElementsByClassName(
                    "timetable-page-container"
                  )[i];
                  setScrollBar(elem);
                  setTransition(false);
                }, 1000);
              }
            }}
            style={{ opacity: i !== curr ? 0.5 : 1 }}
          >
            <div
              style={{ cursor: isTransitioning ? "not-allowed" : "pointer" }}
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
