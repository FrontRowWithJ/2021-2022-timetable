import "../css/firefox-tutorial.css";

import plusIcon from "../resources/Plus Icon.png";
import TutorialSection from "./TutorialSection";
import login from "../resources/mytcdlogin.png";
import myOwnStudentTimetable from "../resources/View My Own Student Timetable.png";
import selectTimetable from "../resources/Select My Timetable.png";
import rightClickInspect from "../resources/Right Click Inspect.png";
import copyHTML from "../resources/Copy Inner HTML.png";

const FireFoxTutorial = () => {
  return (
    <div className="firefox-tutorial-container">
      <TutorialSection
        noImage={true}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <u><i>Attention! this tutorial requires a computer.</i></u>
      </TutorialSection>
      <TutorialSection alt="my.tcd.ie login page" src={login} step={1}>
        Login in to
        <a href="https://my.tcd.ie" target="_blank" rel="noreferrer">
          &nbsp;my.tcd.ie
        </a>
      </TutorialSection>

      <TutorialSection
        step={2}
        alt="User is hovering over the My Timetable Link"
        src={selectTimetable}
      >
        Select the{" "}
        <img
          alt="Plus Icon found on my.tcd.ie navigation bar"
          className="plus-icon"
          src={plusIcon}
        />{" "}
        and navigate to My Timetable.
      </TutorialSection>
      <TutorialSection
        step={3}
        alt="User is hovering over the View My Own Student Timetable link"
        src={myOwnStudentTimetable}
      >
        In the My Timetable section, select "View my Own Student Timetable".
      </TutorialSection>

      <TutorialSection
        step={4}
        alt="The context menu is open and the user is hovering over the inspect button"
        src={rightClickInspect}
      >
        Right click on the whitespace to the right of your timetable and select
        inspect.
      </TutorialSection>
      <TutorialSection alt="" src={copyHTML} step={5}>
        At the top of the Page Inspector, right click on the text that says &lt;
        <span style={{ color: "#0074E8" }}>html&nbsp;</span>
        <span style={{ color: "#DD00A9" }}>class</span>
        <span>="</span>
        <span style={{ color: "#003EAA" }}>tablesaw-enhanced</span>
        <span>"...</span>
        In the menu, hover over Copy and select <u>I</u>nner HTML.
      </TutorialSection>
      <TutorialSection noImage={true} step={6}>
        Return to this website and paste the HTML into the textbox above.
      </TutorialSection>
      <TutorialSection noImage={true} step={7}>
        Click the "Generate timetable" button and enjoy your new timetable!
      </TutorialSection>
    </div>
  );
};

export default FireFoxTutorial;
