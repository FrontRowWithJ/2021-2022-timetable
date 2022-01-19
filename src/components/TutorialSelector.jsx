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
        onclick={() => {
          setClickedBrowser(CHROME);
          //Show chrome tutorial
        }}
      />
      {/* <SafariSVG
          onmouseover={() => setBrowser(SAFARI)}
          onmouseout={() => setBrowser(clickedBrowser)}
          style={browser === SAFARI ? {} : gs}
          onclick={() => {
            setClickedBrowser(SAFARI);
            // Show safari tutorial
          }}
        /> */}
      <EdgeSVG
        onmouseover={() => setBrowser(EDGE)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === EDGE ? {} : gs}
        onclick={() => {
          setClickedBrowser(EDGE);
          // Show edge tutorial
        }}
      />
      <FirefoxSVG
        onmouseover={() => setBrowser(FIREFOX)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === FIREFOX ? {} : gs}
        onclick={() => {
          setClickedBrowser(FIREFOX);
          //Show firefox tutorial
        }}
      />
    </div>
  );
};

export default TutorialSelector;
