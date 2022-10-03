import React, { useEffect, useState } from "react";
import "./app.css";
import Landing from "../Landing";
import TimetableWebpage from "../TimetableWebpage";
import Overlay, { overlayType } from "../Overlay";
import { setTimetableLocalStorage, decompressTimetable } from "../../misc";
import ColorPicker from "../ColorPicker";
import { TimetableData } from "../../timetableData";
import QRCodeOverlay from "../QRCodeOverlay";

const App = () => {
  const [timetableData, setTimetable] = useState<TimetableData>();
  const [isTimetableEnabled, enableTimetable] = useState(false);
  // const storageString =
  //   setTimetableLocalStorage(window.location.search) ||
  //   window.localStorage.getItem("timetable");
  // if (storageString !== null && timetableData === undefined) {
  //   const uncompressed = decompressTimetable(
  //     storageString,
  //     "StorageBinaryString"
  //   );
  //   if (timetableData === undefined) setTimetable(uncompressed);
  //   if (!isTimetableEnabled) enableTimetable(true);
  // }
  const [overlay, setOverlay] = useState<overlayType>(overlayType.DEFAULT);
  const disableOverlay = () => setOverlay(overlayType.DEFAULT);
  useEffect(() => {
    setTimetableLocalStorage(window.location.search)
      .then((storageString) => {
        return storageString ?? localStorage.getItem("timetable");
      })
      .then((storageString) => {
        if (storageString !== null) {
          const timetable = decompressTimetable(
            storageString,
            "StorageBinaryString"
          );
          if (timetableData === undefined) setTimetable(timetable);
          if (!isTimetableEnabled) enableTimetable(true);
        }
      });
  });
  const isTimetable = isTimetableEnabled && timetableData !== undefined;
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
