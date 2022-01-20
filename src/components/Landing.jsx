import React, { useRef, useState } from "react";
import "../css/landing.css";
import { compressTimetable, generateTimetableJSON } from "../util";
import Tutorial from "./Tutorial";
import TutorialSelector from "./TutorialSelector";
import Error from "./Error";

const Landing = ({ enableTimetable, setTimetable }) => {
  const [hasText, setText] = useState(false);
  const textAreaRef = useRef(null);
  const [clickedBrowser, setClickedBrowser] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef(null);
  const generateTimetable = () => {
    const { value } = textAreaRef.current;
    try {
      const timetable = generateTimetableJSON(value);
      const compressed = compressTimetable(timetable, "StorageBinaryString");
      window.localStorage.setItem("timetable", compressed);
      setTimetable(timetable);
      enableTimetable(true);
    } catch (error) {
      if (value.length === 0) setErrorMessage("Textbox is empty.");
      else setErrorMessage("HTML is incorrect.");
      const { current } = errorRef;
      current.style.top = "0";
      setTimeout(() => (current.style.top = ""), 2000);
    }
  };
  return (
    <main>
      <Error errorMessage={errorMessage} errorRef={errorRef} />
      <div className="landing-container">
        <div id="dummy"></div>
        <div className="input-container">
          <div id="wrapper">
            <div id="text-container">
              <textarea spellCheck="false"
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
                id="timetable-button"
                type="button"
                onClick={generateTimetable}
              >
                Generate Timetable
              </button>
              <div></div>
              <div></div>
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
