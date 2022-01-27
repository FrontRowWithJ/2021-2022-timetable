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
import { DEFAULT, CLEAR_TIMETABLE, COPY } from "../misc";
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
  const [timetable, setTimetable] = useState(null);
  const [isTimetableEnabled, enableTimetable] = useState(false);
  const compressedTimetable = window.localStorage.getItem("timetable");
  const [url, setUrl] = useState("");
  const textboxRef = useRef(null);
  const [overlay, setOverlay] = useState(DEFAULT);
  const disableOverlay = () => setOverlay(DEFAULT);
  const resetTimetable = () => {
    window.localStorage.removeItem("timetable");
    window.location.href = window.location.origin;
  };
  if (compressedTimetable !== null && timetable === null) {
    const uncompressed = decompressTimetable(
      compressedTimetable,
      "StorageBinaryString"
    );
    if (timetable === null) setTimetable(uncompressed);
    if (!isTimetableEnabled) enableTimetable(true);
  }

  return (
    <>
      {isTimetableEnabled || timetable !== null ? (
        <TimetableWebpage
          timetableJSON={timetable}
          setOverlay={setOverlay}
          setUrl={setUrl}
          resetTimetable={resetTimetable}
        />
      ) : (
        <Landing
          enableTimetable={enableTimetable}
          setTimetable={setTimetable}
        />
      )}
      {((overlay) => {
        switch (overlay) {
          case COPY:
            return (
              <Overlay
                disableOverlay={disableOverlay}
                isOverlayEnabled={overlay === COPY}
                content={({ urlContainerRef, disableOverlay }) => (
                  <URLContainer
                    disableOverlay={disableOverlay}
                    urlContainerRef={urlContainerRef}
                  >
                    <URLDiv urlRef={textboxRef} url={url} />
                    <CopyButton url={url} urlRef={textboxRef} />
                  </URLContainer>
                )}
              />
            );
          case CLEAR_TIMETABLE:
            return (
              <Overlay
                disableOverlay={disableOverlay}
                isOverlayEnabled={overlay === CLEAR_TIMETABLE}
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
            );
          default:
            return null;
        }
      })(overlay)}
    </>
  );
};

export default App;
