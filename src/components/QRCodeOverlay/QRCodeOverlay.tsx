import "./qr-code-overlay.css";
import { type QRCodeOverlayProps } from "./types";
import { makeCode, QRCodeSVG, QRErrorCorrectLevel } from "../../resources";
import { useEffect, useState } from "react";
import { decompressTimetable, minifyURL } from "../../misc";
import CancelButton from "../CancelButton";

const QRCodeOverlay = ({ disableOverlay }: QRCodeOverlayProps) => {
  const [modules, setModules] = useState<(boolean | null)[][]>();
  useEffect(() => {
    const storageString = localStorage.getItem("timetable");
    const timetableData = decompressTimetable(
      storageString!,
      "StorageBinaryString"
    );
    minifyURL(timetableData, (shortURL, err ) => {
      if(err) {
        //TODO do something about it
      }
      if (shortURL)
        setModules(makeCode(shortURL, QRErrorCorrectLevel.M).modules);
    });
  }, []);

  const props = { lightColor: "white", darkColor: "black" };
  return (
    <div>
      <CancelButton onClick={disableOverlay} />
      <div className="qr-svg-container">
        {modules && <QRCodeSVG {...{ modules, ...props }} />}
      </div>
    </div>
  );
};

export default QRCodeOverlay;
