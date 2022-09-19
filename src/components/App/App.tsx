import React, { useState } from "react";
import "./app.css";
import Landing from "../Landing";
import TimetableWebpage from "../TimetableWebpage";
import Overlay from "../Overlay";
import {
  setTimetableLocalStorage,
  decompressTimetable,
  DEFAULT,
  CUSTOMIZE,
} from "../../misc";
import ColorPicker from "../ColorPicker";
import { genTodaysNotifications } from "../../subscribeNotifications";
import { TimetableData } from "../../timetableData";

const App = () => {
  const [timetableData, setTimetable] = useState<TimetableData | null>(null);
  const [isTimetableEnabled, enableTimetable] = useState(false);
  const compressedTimetable =
    setTimetableLocalStorage(window.location.search) ??
    window.localStorage.getItem("timetable");
  const [overlay, setOverlay] = useState<0 | 1>(DEFAULT);
  if (compressedTimetable !== null && timetableData === null) {
    const uncompressed = decompressTimetable(
      compressedTimetable,
      "StorageBinaryString"
    );
    if (timetableData === null) setTimetable(uncompressed);
    if (!isTimetableEnabled) enableTimetable(true);
  }
  if (
    "Notification" in window &&
    Notification.permission === "granted" &&
    timetableData
  )
    genTodaysNotifications(timetableData);
  return (
    <>
      {isTimetableEnabled && timetableData !== null ? (
        <TimetableWebpage {...{ setOverlay, overlay, timetableData }} />
      ) : (
        <Landing {...{ enableTimetable, setTimetable }} />
      )}
      {overlay === CUSTOMIZE && (
        <Overlay
          disableOverlay={() => setOverlay(DEFAULT)}
          content={({ disableOverlay }) => (
            <ColorPicker onClick={disableOverlay} />
          )}
        />
      )}
    </>
  );
};

export default App;
