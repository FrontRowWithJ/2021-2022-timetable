import React, { useRef, useState } from "react";
import "../css/app.css";
import Landing from "./Landing";
import TimetableWebpage from "./TimetableWebpage";
import Overlay from "./Overlay";
import CopyButton from "./CopyButton";
import URLDiv from "./URLDiv";
import ResetButton from "./ResetButton";
import URLContainer from "./URLContainer";
import { compressTimetable, decompressTimetable } from "../misc";

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
    window.location.href = window.location.origin;
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
          setOverlay={setOverlay}
          isOverlayEnabled={isOverlayEnabled}
          content={({ urlContainerRef, disableOverlay }) => (
            <URLContainer
              disableOverlay={disableOverlay}
              urlContainerRef={urlContainerRef}
            >
              <URLDiv urlRef={textboxRef} url={url} />
              <CopyButton url={url} urlRef={textboxRef} />
            </URLContainer>
          )}
        ></Overlay>
      ) : null}
      {isCancelButtonPressed ? (
        <Overlay
          setOverlay={setCancelButton}
          isOverlayEnabled={isCancelButtonPressed}
          content={({ urlContainerRef, disableOverlay }) => (
            <URLContainer
              urlContainerRef={urlContainerRef}
              disableOverlay={disableOverlay}
            >
              <div className="text-box">{"Are You Sure?"}</div>
              <ResetButton resetTimetable={resetTimetable} />
            </URLContainer>
          )}
        ></Overlay>
      ) : null}
    </>
  );
};

export default App;
