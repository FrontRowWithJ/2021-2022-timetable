import "../css/tutorial.css";
import plusIcon from "../resources/plus-icon.png";
import TutorialSection from "./TutorialSection";
import login from "../resources/mytcdie-login.png";
import myOwnStudentTimetable from "../resources/view-student-timetable.png";
import selectTimetable from "../resources/select-timetable.png";

import rightClickInspectFirefox from "../resources/right-click-inspect-firefox.png";
import copyHTMLFirefox from "../resources/copy-HTML-firefox.png";

import rightClickInspectChrome from "../resources/right-click-inspect-chrome.png";
import copyHTMLChrome from "../resources/copy-HTML-chrome.png";

import rightClickInspectEdge from "../resources/right-click-inspect-edge.png";
import copyHTMLEdge from "../resources/copy-HTML-edge.png";

import { FIREFOX, CHROME, EDGE, SAFARI } from "../util";
const Tutorial = (clickedBrowser) => {
  return (
    <div className="tutorial-container">
      <TutorialSection
        noImage
        style={{ display: "flex", justifyContent: "center" }}
      >
        <u>
          <i>Attention! this tutorial requires a computer.</i>
        </u>
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
          style={{ width: "1rem", height: "1rem" }}
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
      <Edge />
      {((browser) => {
        switch (browser) {
          case FIREFOX:
            return <Firefox />;
          case CHROME:
            return <Chrome />;
          case EDGE:
            return <Edge />;
          case SAFARI:
          default:
            return null;
        }
      })(clickedBrowser)}
      <TutorialSection noImage step={6}>
        Return to this website and paste the HTML into the textbox above.
      </TutorialSection>
      <TutorialSection noImage step={7}>
        Click the "Generate timetable" button and enjoy your new timetable!
      </TutorialSection>
    </div>
  );
};

const Firefox = () => {
  return (
    <>
      <TutorialSection
        step={4}
        alt="The context menu is open and the user is hovering over the inspect button"
        src={rightClickInspectFirefox}
      >
        Right click on the whitespace to the right of your timetable and select
        inspect.
      </TutorialSection>
      <TutorialSection alt="" src={copyHTMLFirefox} step={5}>
        At the top of the Page Inspector, right click on the text that says:
        &nbsp;
        <div style={{ display: "inline-block" }}>
          <span>&lt;</span>
          <span style={{ color: "#4989F4" }}>html&nbsp;</span>
          <span style={{ color: "#DD00A9" }}>class</span>
          <span>="</span>
          <span style={{ color: "#003EAA" }}>tablesaw-enhanced</span>
          <span>"&nbsp;</span>
          <span style={{ color: "#DD00A9" }}>lang</span>
          <span>="</span>
          <span style={{ color: "#003EAA" }}>en-gb</span>
          <span>"&gt;</span>
        </div>
        <br />
        In the menu, hover over Copy and select <u>I</u>nner HTML.
      </TutorialSection>
    </>
  );
};

const Chrome = () => {
  return (
    <>
      <TutorialSection
        step={4}
        alt="The context menu is open and the user is hovering over the inspect button"
        src={rightClickInspectChrome}
      >
        Right click on the whitespace to the right of your timetable and select
        inspect.
      </TutorialSection>
      <TutorialSection alt="" src={copyHTMLChrome} step={5}>
        At the top of the Page Inspector, right click on the text that
        says:&nbsp;
        <div style={{ display: "inline-block" }}>
          <span style={{ color: "#A894A6" }}>&lt;</span>
          <span style={{ color: "#881280" }}>html&nbsp;</span>
          <span style={{ color: "#994500" }}>lang</span>
          <span style={{ color: "#A894A6" }}>="</span>
          <span style={{ color: "#1A1AA6" }}>en-gb</span>
          <span style={{ color: "#A894A6" }}>"&nbsp;</span>
          <span style={{ color: "#994500" }}>class</span>
          <span style={{ color: "#A894A6" }}>="</span>
          <span style={{ color: "#1A1AA6" }}>tablesaw-enhanced</span>
          <span style={{ color: "#A894A6" }}>"&gt;</span>.
        </div>
        <br />
        In the menu, hover over Copy and select Copy element.
      </TutorialSection>
    </>
  );
};

const Edge = () => {
  return (
    <>
      <TutorialSection
        step={4}
        alt="The context menu is open and the user is hovering over the inspect button"
        src={rightClickInspectEdge}
      >
        Right click on the whitespace to the right of your timetable and select
        inspect.
      </TutorialSection>
      <TutorialSection alt="" src={copyHTMLEdge} step={5}>
        At the top of the Page Inspector, right click on the text that
        says:&nbsp;
        <div style={{ display: "inline-block" }}>
          <span style={{ color: "#4A69C9" }}>&lt;</span>
          <span style={{ color: "#132C79" }}>html&nbsp;</span>
          <span style={{ color: "#994500" }}>lang</span>
          <span style={{ color: "#666666" }}>="</span>
          <span style={{ color: "#9E3379" }}>en-gb</span>
          <span style={{ color: "#666666" }}>"&nbsp;</span>
          <span style={{ color: "#994500" }}>class</span>
          <span style={{ color: "#666666" }}>="</span>
          <span style={{ color: "#9E3379" }}>tablesaw-enhanced</span>
          <span style={{ color: "#666666" }}>"</span>
          <span style={{ color: "#4A69C9" }}>&gt;</span>.
        </div>
        <br />
        In the menu, hover over Copy and select Copy element.
      </TutorialSection>
    </>
  );
};

export default Tutorial;
