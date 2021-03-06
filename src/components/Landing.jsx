import React, { useRef, useState } from "react";
import "../css/landing.css";
import {
  compressTimetable,
  decompressTimetable,
  HTMLToTimetable,
  setTimetableLocalStorage,
} from "../misc";
import Tutorial from "./Tutorial";
import TutorialSelector from "./TutorialSelector";
import Error from "./Error";
import Input from "./Input";

const Landing = ({ enableTimetable, setTimetable }) => {
  const [clickedBrowser, setClickedBrowser] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef(null);
  const htmlAreaRef = useRef(null);
  const urlAreaRef = useRef(null);

  const handleError = (errorMessage) => {
    setErrorMessage(errorMessage);
    const { current } = errorRef;
    current.style.top = "0";
    setTimeout(() => (current.style.top = ""), 2000);
  };

  return (
    <main id="top">
      <Error errorMessage={errorMessage} errorRef={errorRef} />
      <div className="landing-container">
        <div id="dummy" style={{ display: "none" }}></div>
        <Input
          placeholder="PASTE HTML HERE"
          buttonText="Generate Timetable from HTML"
          inputRef={htmlAreaRef}
          generateTimetable={() => {
            const { value: text } = htmlAreaRef.current;
            try {
              const timetable = HTMLToTimetable(text);
              const compressed = compressTimetable(
                timetable,
                "StorageBinaryString"
              );
              window.localStorage.setItem("timetable", compressed);
              setTimetable(timetable);
              enableTimetable(true);
            } catch (error) {
              if (text.length === 0) handleError("Textbox is empty.");
              else handleError("HTML is malformed.");
            }
          }}
        />
        <Input
          placeholder="PASTE URL HERE"
          buttonText="Generate Timetable from URL"
          inputRef={urlAreaRef}
          generateTimetable={() => {
            const { value: url } = urlAreaRef.current;
            if (url.length === 0) return handleError("Textbox is empty.");
            const params = url.substring(url.indexOf("?"));
            const compressedTimetable = setTimetableLocalStorage(params);
            if (!compressedTimetable) return handleError("URL is malformed.");
            const uncompressed = decompressTimetable(
              compressedTimetable,
              "StorageBinaryString"
            );
            setTimetable(uncompressed);
            enableTimetable(true);
          }}
        />
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
