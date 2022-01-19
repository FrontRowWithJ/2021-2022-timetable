import { useEffect } from "react";
import { ellipsify } from "../util";

const URLDiv = ({ className, url, ref }) => {
  useEffect(() => {
    const { current: div } = ref;
    div.innerHTML = ellipsify(url, div);
  });
  return <div className={className} ref={ref}></div>;
};

export default URLDiv;
