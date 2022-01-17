import CopyLinkSVG from "./CopyLinkSVG";
import { useState } from "react";

const CopyButton = ({ id, url }) => {
  const [fill, setFill] = useState("white");
  return (
    <div
      id={id}
      onClick={() => {
        navigator.clipboard.writeText(url);
        setFill("#3fff00");
        setTimeout(() => setFill("white"), 600);
      }}
    >
      <CopyLinkSVG fill={fill} />
    </div>
  );
};

export default CopyButton;
