import React, { useState } from "react";
import "../css/app.css";
import Landing from "./Landing";
import TimetableWebpage from "./TimetableWebpage";
import Overlay from "./Overlay";
import {
  compressTimetable,
  decompressTimetable,
  URLSafetoBase64,
} from "../misc";
import { DEFAULT, CUSTOMIZE } from "../misc";
import ColorPicker from "./ColorPicker";

const App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const timetableBase64 = urlParams.get("timetable");
  if (timetableBase64) {
    const base64 = URLSafetoBase64(timetableBase64);
    const timetable = decompressTimetable(base64, "Base64");
    const storageString = compressTimetable(timetable, "StorageBinaryString");
    const localStorageString = window.localStorage.getItem("timetable");
    if (localStorageString !== storageString)
      window.localStorage.setItem("timetable", storageString);
  }
  const [timetable, setTimetable] = useState(null);
  const [isTimetableEnabled, enableTimetable] = useState(false);
  const compressedTimetable = window.localStorage.getItem("timetable");
  const [overlay, setOverlay] = useState(DEFAULT);
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
          overlay={overlay}
        />
      ) : (
        <Landing
          enableTimetable={enableTimetable}
          setTimetable={setTimetable}
        />
      )}
      {((overlay) => {
        switch (overlay) {
          case CUSTOMIZE:
            return (
              <Overlay
                disableOverlay={() => setOverlay(DEFAULT)}
                content={({ disableOverlay }) => (
                  <ColorPicker onClick={disableOverlay} />
                )}
              />
            );
          default:
            return null;
        }
      })(overlay)}
    </>
  );
};

export default App;
