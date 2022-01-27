import { useEffect } from "react";
import { ellipsify } from "../misc";

const URLDiv = ({ url, urlRef }) => {
  useEffect(() => {
    const { current: div } = urlRef;
    div.innerHTML = ellipsify(url, div);
  });
  return <div className="text-box" ref={urlRef}></div>;
};

export default URLDiv;
