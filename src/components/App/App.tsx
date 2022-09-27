import React, { useState } from "react";
import "./app.css";
import Landing from "../Landing";
import TimetableWebpage from "../TimetableWebpage";
import Overlay, { overlayType } from "../Overlay";
import { setTimetableLocalStorage, decompressTimetable } from "../../misc";
import ColorPicker from "../ColorPicker";
import { TimetableData } from "../../timetableData";
import QRCodeOverlay from "../QRCodeOverlay";

const App = () => {
  const [timetableData, setTimetable] = useState<TimetableData | null>(null);
  const [isTimetableEnabled, enableTimetable] = useState(false);
  const storageString =
    setTimetableLocalStorage(window.location.search) ||
    window.localStorage.getItem("timetable");
  if (storageString !== null && timetableData === null) {
    const uncompressed = decompressTimetable(
      storageString,
      "StorageBinaryString"
    );
    if (timetableData === null) setTimetable(uncompressed);
    if (!isTimetableEnabled) enableTimetable(true);
  }

  const [overlay, setOverlay] = useState<overlayType>(overlayType.DEFAULT);
  const disableOverlay = () => setOverlay(overlayType.DEFAULT);
  const isTimetable = isTimetableEnabled && timetableData !== null;
  return (
    <>
      {isTimetable ? (
        <TimetableWebpage {...{ setOverlay, overlay, timetableData }} />
      ) : (
        <Landing {...{ enableTimetable, setTimetable }} />
      )}
      {
        {
          customize: (
            <Overlay
              {...{
                disableOverlay,
              }}
              content={(disableOverlay: () => void) => (
                <ColorPicker {...{ disableOverlay }} />
              )}
            />
          ),
          qrcode: (
            <Overlay
              {...{
                disableOverlay,
              }}
              content={(disableOverlay: () => void) => (
                <QRCodeOverlay {...{ disableOverlay }} />
              )}
            />
          ),
          default: undefined,
        }[overlay]
      }
    </>
  );
};

export default App;
