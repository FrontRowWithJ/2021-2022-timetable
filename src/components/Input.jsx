import { useState } from "react";
import "../css/input.css";
const Input = ({ generateTimetable, placeholder, inputRef, buttonText }) => {
  const [hasText, setText] = useState(false);
  return (
    <div className="wrapper">
      <div className="text-container">
        <input
          style={{ backgroundColor: hasText ? "white" : "" }}
          spellCheck="false"
          ref={inputRef}
          onChange={({ target }) => {
            setText(target.value.length !== 0);
          }}
          onKeyDown={({ key }) => key === "Enter" && generateTimetable()}
        ></input>
        <div className="placeholder" style={{ display: hasText ? "none" : "" }}>
          {placeholder}
        </div>
      </div>
      <div className="button-container">
        <button
          className="timetable-button"
          type="button"
          onClick={generateTimetable}
        >
          {buttonText}
        </button>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Input;
