import React, { useRef, useState } from "react";
import "./css/landing.css";
import { compressTimetable, generateTimetableJSON } from "./util";

const Landing = ({ enableTimetable, setTimetable }) => {
  const [hasText, setText] = useState(false);
  const textAreaRef = useRef(null);
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
                  const compressed = compressTimetable(timetable, "StorageBinaryString");
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
        <div className="tutorial-container">
          <ul>
            <li>
              Login in to
              <a href="https://my.tcd.ie" target="_blank" rel="noreferrer">
                &nbsp;my.tcd.ie
              </a>
            </li>
            <li>Select the plus sign and navigate to My Timetable.</li>
            <li>
              In the My Timetable section, select "View my Own Student
              Timetable".
            </li>
            <li>Right Click and select inspect.</li>
            <li>
              A panel should have appeared on the side of your screen showing
              some fancy looking text. It's actually the this webpage but in
              html.
            </li>
            <li>
              At the top of the panel you should see some text that says{" "}
              <i style={{ color: "#56565A" }}>&lt;!DOCTYPE html&gt;</i>.
              <br />
              Right click on the text underneath that says &lt;
              <span style={{ color: "#0074E8" }}>html&nbsp;</span>
              <span style={{ color: "#DD00A9" }}>class</span>
              <span>="</span>
              <span style={{ color: "#003EAA" }}>tablesaw-enhanced</span>
              <span>"...</span>
            </li>
            <li>Hover over Copy in the context menu and select Inner HTML.</li>
            <li>
              Return to this website and paste the text into the textbox above.
            </li>
            <li>
              Click the "Generate timetable" button and enjoy your new found
              timetable!
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Landing;
