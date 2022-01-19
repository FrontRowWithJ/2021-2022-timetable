import { useEffect } from "react";
import { ellipsify } from "../util";

const URLDiv = ({ className, url, urlRef }) => {
  useEffect(() => {
    const { current: div } = urlRef;
    div.innerHTML = ellipsify(url, div);
  });
  return <div className={className} ref={urlRef}></div>;
};

export default URLDiv;
