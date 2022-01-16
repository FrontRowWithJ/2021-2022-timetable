import React, { useState } from "react";
import "./css/app.css";
import Landing from "./Landing";
import TimetableWebpage from "./TimetableWebpage";
import { decompressTimetable } from "./util";

const App = () => {
  const [timetable, setTimetable] = useState(null);
  const [isTimetableEnabled, enableTimetable] = useState(false);
  const compressedTimetable = window.localStorage.getItem("timetable");
  if (compressedTimetable !== null && timetable === null) {
    const _timetable = decompressTimetable(
      compressedTimetable,
      "StorageBinaryString"
    );
    if (timetable === null) setTimetable(_timetable);
    if (!isTimetableEnabled) enableTimetable(true);
  }
  return isTimetableEnabled || timetable !== null ? (
    <TimetableWebpage timetableJSON={timetable} />
  ) : (
    <Landing enableTimetable={enableTimetable} setTimetable={setTimetable} />
  );
};

export default App;
