import React from "react";
import "./css/header.css";

const Header = (props) => {
  return (
    <div id="header">
      {["M", "T", "W", "T", "F"].map((day, i) => (
        <div
          key={i}
          onClick={() => {
            props.setNext(i);
            props.setTransition(true);
          }}
        >
          <div
            style={{ cursor: props.isTransitioning ? "not-allowed" : "pointer" }}
          >
            {day}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
