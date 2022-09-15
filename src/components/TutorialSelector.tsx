import "../css/tutorial-selector.css";
import EdgeLogo from "./svg/EdgeLogo";
import ChromeLogo from "./svg/ChromeLogo";
import FirefoxLogo from "./svg/FirefoxLogo";
import SafariLogo from "./svg/SafariLogo";
import { useState } from "react";
import { FIREFOX, CHROME, SAFARI, EDGE } from "../misc";

interface TutorialSectionProps {
  setClickedBrowser: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>;
  clickedBrowser: 0 | 1 | 2 | 3;
}

const TutorialSelector = ({
  clickedBrowser,
  setClickedBrowser,
}: TutorialSectionProps) => {
  const [browser, setBrowser] = useState(0);
  const gs = { filter: "grayscale(100%)" };
  return (
    <div className="selector-container">
      <ChromeLogo
        onmouseover={() => setBrowser(CHROME)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === CHROME ? {} : gs}
        onClick={() => {
          setClickedBrowser(CHROME);
          setBrowser(CHROME);
        }}
      />
      <SafariLogo
        onmouseover={() => setBrowser(SAFARI)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === SAFARI ? {} : gs}
        onClick={() => {
          setClickedBrowser(SAFARI);
          setBrowser(SAFARI);
        }}
      />
      <EdgeLogo
        onmouseover={() => setBrowser(EDGE)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === EDGE ? {} : gs}
        onClick={() => {
          setClickedBrowser(EDGE);
          setBrowser(EDGE);
        }}
      />
      <FirefoxLogo
        onmouseover={() => setBrowser(FIREFOX)}
        onmouseout={() => setBrowser(clickedBrowser)}
        style={browser === FIREFOX ? {} : gs}
        onClick={() => {
          setClickedBrowser(FIREFOX);
          setBrowser(FIREFOX);
        }}
      />
    </div>
  );
};

export default TutorialSelector;
