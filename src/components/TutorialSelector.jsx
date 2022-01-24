import "../css/tutorial-selector.css";
import EdgeLogo from "./svg/EdgeLogo";
import ChromeLogo from "./svg/ChromeLogo";
import FirefoxLogo from "./svg/FirefoxLogo";
import SafariLogo from "./svg/SafariLogo";
import { useState } from "react";
import { FIREFOX, CHROME, SAFARI, EDGE } from "../misc";

const TutorialSelector = ({ clickedBrowser, setClickedBrowser }) => {
  const [browser, setBrowser] = useState(0);
  const gs = { filter: "grayscale(100%)" };
  return (
    <div className="selector-container">
      <ChromeLogo
        onmouseover={() => setBrowser(CHROME)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === CHROME ? {} : gs}
        onclick={() => setClickedBrowser(CHROME)}
      />
      {/* <SafariLogo
          onmouseover={() => setBrowser(SAFARI)}
          onmouseout={() => setBrowser(clickedBrowser)}
          style={browser === SAFARI ? {} : gs}
          onclick={() => {
            setClickedBrowser(SAFARI);
          }}
        /> */}
      <EdgeLogo
        onmouseover={() => setBrowser(EDGE)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === EDGE ? {} : gs}
        onclick={() => setClickedBrowser(EDGE)}
      />
      <FirefoxLogo
        onmouseover={() => setBrowser(FIREFOX)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === FIREFOX ? {} : gs}
        onclick={() => setClickedBrowser(FIREFOX)}
      />
    </div>
  );
};

export default TutorialSelector;
