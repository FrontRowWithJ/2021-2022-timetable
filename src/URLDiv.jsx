import { useEffect, useRef } from "react";
import { ellipsify } from "./util";

const URLDiv = ({ className, url }) => {
  const textboxRef = useRef(null);
  useEffect(() => {
    const { current: div } = textboxRef;
    div.innerHTML = ellipsify(url, div);
  });
  return <div className={className} ref={textboxRef}></div>;
};

export default URLDiv;




