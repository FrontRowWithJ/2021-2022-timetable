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
              if (!isTransitioning) {
                setNext(i);
                setTransition(true);
                setTimeout(() => setTransition(false), 1000);
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
