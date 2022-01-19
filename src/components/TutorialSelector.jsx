import "../css/tutorial-selector.css";
import EdgeSVG from "./EdgeSVG";
import ChromeSVG from "./ChromeSVG";
import FirefoxSVG from "./FirefoxSVG";
import SafariSVG from "./SafariSVG";
import { useState } from "react";
const [FIREFOX, CHROME, SAFARI, EDGE] = [0, 1, 2, 3];

const TutorialSelector = () => {
  const [browser, setBrowser] = useState(0);
  const [clickedBrowser, setClickedBrowser] = useState(0);
  const gs = { filter: "grayscale(100%)" };
  return (
    <div className="selector-container">
      <FirefoxSVG
        onmouseover={() => setBrowser(FIREFOX)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === FIREFOX ? {} : gs}
        onclick={() => {
          setClickedBrowser(FIREFOX);
          //Show firefox tutorial
        }}
      />
      <ChromeSVG
        onmouseover={() => setBrowser(CHROME)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === CHROME ? {} : gs}
        onclick={() => {
          setClickedBrowser(CHROME);
          //Show chrome tutorial
        }}
      />
      <SafariSVG
        onmouseover={() => setBrowser(SAFARI)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === SAFARI ? {} : gs}
        onclick={() => {
          setClickedBrowser(SAFARI);
          // Show safari tutorial
        }}
      />
      <EdgeSVG
        onmouseover={() => setBrowser(EDGE)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === EDGE ? {} : gs}
        onclick={() => {
          setClickedBrowser(EDGE);
          // Show edge tutorial
        }}
      />
    </div>
  );
};

export default TutorialSelector;
