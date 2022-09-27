import React, { useRef, useState } from "react";
import "./landing.css";
import {
  compressTimetable,
  decompressTimetable,
  HTMLToTimetable,
  setTimetableLocalStorage,
} from "../../misc";
import Tutorial from "../Tutorial";
import TutorialSelector from "../TutorialSelector";
import Error from "../Error";
import Input from "../Input";
import { LandingProps } from "./types";
import { CHROME } from "../TutorialSelector";

const Landing = ({ enableTimetable, setTimetable }: LandingProps) => {
  const [clickedBrowser, setClickedBrowser] = useState<0 | 1 | 2 | 3>(CHROME);
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const htmlAreaRef = useRef<HTMLInputElement>(null);
  const urlAreaRef = useRef<HTMLInputElement>(null);

  const handleError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    const { current } = errorRef;
    if (current) {
      current.style.top = "0";
      setTimeout(() => (current.style.top = ""), 2000);
    }
  };

  return (
    <main id="top">
      <Error {...{ errorMessage, errorRef }} />
      <div className="landing-container">
        <div id="dummy" style={{ display: "none" }}></div>
        <Input
          placeholder="PASTE HTML HERE"
          buttonText="Generate Timetable from HTML"
          inputRef={htmlAreaRef}
          generateTimetable={() => {
            if (htmlAreaRef.current) {
              const { value: text } = htmlAreaRef.current;
              try {
                const timetable = HTMLToTimetable(text);
                const storageString = compressTimetable(
                  timetable,
                  "StorageBinaryString"
                );
                window.localStorage.setItem("timetable", storageString);
                setTimetable(timetable);
                enableTimetable(true);
              } catch (error) {
                if (text.length === 0) handleError("Textbox is empty.");
                else handleError("HTML is malformed.");
              }
            }
          }}
        />
        <Input
          placeholder="PASTE URL HERE"
          buttonText="Generate Timetable from URL"
          inputRef={urlAreaRef}
          generateTimetable={() => {
            if (urlAreaRef.current) {
              const { value: url } = urlAreaRef.current;
              if (url.length === 0) return handleError("Textbox is empty.");
              const params = url.substring(url.indexOf("?"));
              const storageString = setTimetableLocalStorage(params);
              if (!storageString) return handleError("URL is malformed.");
              const uncompressed = decompressTimetable(
                storageString,
                "StorageBinaryString"
              );
              setTimetable(uncompressed);
              enableTimetable(true);
            }
          }}
        />
        <TutorialSelector {...{ clickedBrowser, setClickedBrowser }} />
        <Tutorial {...{ clickedBrowser }} />
      </div>
    </main>
  );
};

export default Landing;
