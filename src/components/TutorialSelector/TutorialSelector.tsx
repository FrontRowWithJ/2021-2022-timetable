import "./tutorial-selector.css";
import { useState } from "react";
import { FIREFOX, CHROME, SAFARI, EDGE } from "./constants";
import { TutorialSectionProps } from "./types";
import { ChromeLogo, SafariLogo, EdgeLogo, FirefoxLogo } from "../../resources";

const TutorialSelector = ({
  clickedBrowser,
  setClickedBrowser,
}: TutorialSectionProps) => {
  const [browser, setBrowser] = useState(0);
  const gs = { filter: "grayscale(100%)" };
  return (
    <div className="selector-container">
      <ChromeLogo
        onMouseOver={() => setBrowser(CHROME)}
        onMouseOut={() => setBrowser(clickedBrowser)}
        style={browser === CHROME ? {} : gs}
        onClick={() => {
          setClickedBrowser(CHROME);
          setBrowser(CHROME);
        }}
      />
      <SafariLogo
        onMouseOver={() => setBrowser(SAFARI)}
        onMouseOut={() => setBrowser(clickedBrowser)}
        style={browser === SAFARI ? {} : gs}
        onClick={() => {
          setClickedBrowser(SAFARI);
          setBrowser(SAFARI);
        }}
      />
      <EdgeLogo
        onMouseOver={() => setBrowser(EDGE)}
        onMouseOut={() => setBrowser(clickedBrowser)}
        style={browser === EDGE ? {} : gs}
        onClick={() => {
          setClickedBrowser(EDGE);
          setBrowser(EDGE);
        }}
      />
      <FirefoxLogo
        onMouseOver={() => setBrowser(FIREFOX)}
        onMouseOut={() => setBrowser(clickedBrowser)}
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
