import React, { useState } from "react";
import "../css/app.css";
import Landing from "./Landing";
import TimetableWebpage from "./TimetableWebpage";
import Overlay from "./Overlay";
import { setTimetableLocalStorage, decompressTimetable } from "../misc";
import { DEFAULT, CUSTOMIZE } from "../misc";
import ColorPicker from "./ColorPicker";
import { genTodaysNotifications } from "../subscribeNotifications";
const App = () => {
  const [timetable, setTimetable] = useState(null);
  const [isTimetableEnabled, enableTimetable] = useState(false);
  const compressedTimetable =
    setTimetableLocalStorage(window.location.search) ??
    window.localStorage.getItem("timetable");
  const [overlay, setOverlay] = useState(DEFAULT);
  if (compressedTimetable !== null && timetable === null) {
    const uncompressed = decompressTimetable(
      compressedTimetable,
      "StorageBinaryString"
    );
    if (timetable === null) setTimetable(uncompressed);
    if (!isTimetableEnabled) enableTimetable(true);
  }
  if (
    "Notification" in window &&
    Notification.permission === "granted" &&
    timetable
  )
    genTodaysNotifications(timetable);
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
