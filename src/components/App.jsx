import React, { useRef, useState } from "react";
import "../css/app.css";
import Landing from "./Landing";
import TimetableWebpage from "./TimetableWebpage";
import Overlay from "./Overlay";
import CopyButton from "./CopyButton";
import URLDiv from "./URLDiv";
import ResetButton from "./ResetButton";
import { compressTimetable, decompressTimetable } from "../util";

const App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const timetableBase64 = urlParams.get("timetable");
  if (timetableBase64) {
    const timetable = decompressTimetable(timetableBase64, "Base64");
    const storageString = compressTimetable(timetable, "StorageString");
    const localStorageString = window.localStorage.getItem("timetable");
    if (localStorageString !== storageString)
      window.localStorage.setItem("timetable", storageString);
  }
  const [isOverlayEnabled, setOverlay] = useState(false);
  const [timetable, setTimetable] = useState(null);
  const [isTimetableEnabled, enableTimetable] = useState(false);
  const compressedTimetable = window.localStorage.getItem("timetable");
  const [url, setUrl] = useState("");
  const [isCancelButtonPressed, setCancelButton] = useState(false);
  const textboxRef = useRef(null);
  const resetTimetable = () => {
    setTimetable(null);
    enableTimetable(false);
    window.localStorage.removeItem("timetable");
    setUrl("");
    setOverlay(false);
    setCancelButton(false);
    window.location.href = window.location.origin
  };
  if (compressedTimetable !== null && timetable === null) {
    const _timetable = decompressTimetable(
      compressedTimetable,
      "StorageBinaryString"
    );
    if (timetable === null) setTimetable(_timetable);
    if (!isTimetableEnabled) enableTimetable(true);
  }

  return (
    <>
      {isTimetableEnabled || timetable !== null ? (
        <TimetableWebpage
          timetableJSON={timetable}
          setOverlay={setOverlay}
          setCancelButton={setCancelButton}
          setUrl={setUrl}
          resetTimetable={resetTimetable}
        />
      ) : (
        <Landing
          enableTimetable={enableTimetable}
          setTimetable={setTimetable}
        />
      )}
      {isOverlayEnabled ? (
        <Overlay
          text={url}
          setOverlay={setOverlay}
          isOverlayEnabled={isOverlayEnabled}
          textbox={({ className, text }) => (
            <URLDiv ref={textboxRef} className={className} url={text} />
          )}
          button={({ id, text }) => <CopyButton id={id} url={text} ref={textboxRef} />}
        />
      ) : null}
      {isCancelButtonPressed ? (
        <Overlay
          text="Are You Sure?"
          setOverlay={setCancelButton}
          isOverlayEnabled={isCancelButtonPressed}
          textbox={({ className, text }) => (
            <div className={className}>{text}</div>
          )}
          button={({ id }) => (
            <ResetButton id={id} resetTimetable={resetTimetable} />
          )}
        />
      ) : null}
    </>
  );
};

export default App;
