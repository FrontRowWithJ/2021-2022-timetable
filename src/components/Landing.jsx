import React, { useRef, useState } from "react";
import "../css/landing.css";
import { compressTimetable, generateTimetableJSON } from "../util";
import Tutorial from "./Tutorial";
import TutorialSelector from "./TutorialSelector";

const Landing = ({ enableTimetable, setTimetable }) => {
  const [hasText, setText] = useState(false);
  const textAreaRef = useRef(null);
  const [clickedBrowser, setClickedBrowser] = useState(0);
  return (
    <main>
      <div className="landing-container">
        <div id="dummy"></div>
        <div className="input-container">
          <div id="wrapper">
            <div id="text-container">
              <textarea
                ref={textAreaRef}
                onChange={({ target }) => {
                  setText(target.value.length !== 0);
                }}
              ></textarea>
              <div id="placeholder" style={{ display: hasText ? "none" : "" }}>
                Paste HTML Here
              </div>
            </div>
            <div id="button-container">
              <button
                type="button"
                onClick={() => {
                  const { value } = textAreaRef.current;
                  const timetable = generateTimetableJSON(value);
                  const compressed = compressTimetable(
                    timetable,
                    "StorageBinaryString"
                  );
                  window.localStorage.setItem("timetable", compressed);
                  setTimetable(timetable);
                  enableTimetable(true);
                }}
              >
                Generate Timetable
              </button>
            </div>
          </div>
        </div>
        <TutorialSelector
          clickedBrowser={clickedBrowser}
          setClickedBrowser={setClickedBrowser}
        />
        <Tutorial clickedBrowser={clickedBrowser} />
      </div>
    </main>
  );
};

export default Landing;
