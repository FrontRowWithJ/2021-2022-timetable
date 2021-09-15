import React from "react";
import "./css/header.css";

const Header = ({ setNext, setTransition, isTransitioning, curr }) => {
  return (
    <div id="header">
      {["M", "T", "W", "T", "F"].map((day, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              setNext(i);
              setTransition(true);
            }}
            style={{ opacity: i !== curr ? 0.25 : 1 }}
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
