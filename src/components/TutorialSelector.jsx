import "../css/tutorial-selector.css";
import EdgeSVG from "./EdgeSVG";
import ChromeSVG from "./ChromeSVG";
import FirefoxSVG from "./FirefoxSVG";
import SafariSVG from "./SafariSVG";
import { useState } from "react";
import { FIREFOX, CHROME, SAFARI, EDGE } from "../util";

const TutorialSelector = ({ clickedBrowser, setClickedBrowser }) => {
  const [browser, setBrowser] = useState(0);
  const gs = { filter: "grayscale(100%)" };
  return (
    <div className="selector-container">
      <ChromeSVG
        onmouseover={() => setBrowser(CHROME)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === CHROME ? {} : gs}
        onclick={() => setClickedBrowser(CHROME)}
      />
      {/* <SafariSVG
          onmouseover={() => setBrowser(SAFARI)}
          onmouseout={() => setBrowser(clickedBrowser)}
          style={browser === SAFARI ? {} : gs}
          onclick={() => {
            setClickedBrowser(SAFARI);
          }}
        /> */}
      <EdgeSVG
        onmouseover={() => setBrowser(EDGE)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === EDGE ? {} : gs}
        onclick={() => setClickedBrowser(EDGE)}
      />
      <FirefoxSVG
        onmouseover={() => setBrowser(FIREFOX)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === FIREFOX ? {} : gs}
        onclick={() => setClickedBrowser(FIREFOX)}
      />
    </div>
  );
};

export default TutorialSelector;
