import "./qr-code-overlay.css";
import { type QRCodeOverlayProps } from "./types";
import { makeCode, QRCodeSVG, QRErrorCorrectLevel } from "../../resources";
import { useMemo } from "react";
import { base64ToURLSafe, getBaseURL } from "../../misc";
import CancelButton from "../CancelButton";
import LZUTF8 from "lzutf8";

const QRCodeOverlay = ({ disableOverlay }: QRCodeOverlayProps) => {
  const modules = useMemo(() => {
    const storageString = localStorage.getItem("timetable");
    const minified = LZUTF8.decompress(storageString, {
      inputEncoding: "StorageBinaryString",
      outputEncoding: "String",
    });
    const base64 = LZUTF8.compress(minified, {
      inputEncoding: "String",
      outputEncoding: "Base64",
    });
    const url = `${getBaseURL()}?timetable=${base64ToURLSafe(base64)}`;
    return makeCode(url, QRErrorCorrectLevel.M).modules;
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
