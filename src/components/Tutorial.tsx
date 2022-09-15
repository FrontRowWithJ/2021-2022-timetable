import "../css/tutorial.css";
import TutorialSection from "./TutorialSection";

import {
  plusIcon,
  login,
  myOwnStudentTimetable,
  selectTimetable,
  optionsClickToExpand,
  clickOptionsToTexpand,
  enterDates,
  rightClickInspectChrome,
  rightClickInspectEdge,
  rightClickInspectFirefox,
  rightClickInspectSafari,
  copyHTMLChrome,
  copyHTMLEdge,
  copyHTMLFirefox,
  copyHTMLSafari,
} from "../resources";

import { FIREFOX, CHROME, EDGE, SAFARI } from "../misc";

const Tutorial = ({ clickedBrowser }: { clickedBrowser: 0 | 1 | 2 | 3 }) => {
  return (
    <div className="tutorial-container">
      <TutorialSection
        noImg
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <i>
          Attention! To use this on mobile, these steps must be completed on a
          computer.
        </i>
      </TutorialSection>
      <TutorialSection alt="my.tcd.ie login page" src={login} step={1}>
        Login in to&nbsp;
        <a href="https://my.tcd.ie" target="_blank" rel="noreferrer">
          my.tcd.ie
        </a>
      </TutorialSection>
      <TutorialSection
        step={2}
        alt="User is hovering over the My Timetable Link."
        src={selectTimetable}
      >
        Select the{" "}
        <img
          alt="Plus Icon found on my.tcd.ie navigation bar."
          style={{ width: "1rem", height: "1rem", verticalAlign: "middle" }}
          src={plusIcon}
        />{" "}
        and navigate to My Timetable.
      </TutorialSection>
      <TutorialSection
        step={3}
        alt="User is hovering over the View My Own Student Timetable link."
        src={myOwnStudentTimetable}
      >
        In the My Timetable section, select "View my Own Student Timetable".
      </TutorialSection>
      <TutorialSection
        step={4}
        alt="User selected the Options button and is about to click Go"
        src={clickOptionsToTexpand}
      >
        Click on&nbsp;
        <img
          alt="Text that says Options click to expand."
          style={{ width: "10.66rem", height: "2rem", verticalAlign: "middle" }}
          src={optionsClickToExpand}
        ></img>
        &nbsp;and click Go.
      </TutorialSection>
      <TutorialSection
        step={5}
        alt="User enters the start and end week for the academic year and selects accept."
        src={enterDates}
      >
        To ensure that Semester 2 timetable is present, set{" "}
        <BoldText>Academic Year</BoldText> to "2021/22",{" "}
        <BoldText>Start Week</BoldText> to "22" and{" "}
        <BoldText>End Week</BoldText> to "39" and then click Accept.
        <br /> <i>(You might have to repeat this step a couple times.)</i>
      </TutorialSection>
      {((browser) => {
        switch (browser) {
          case FIREFOX:
            return <Firefox />;
          case CHROME:
            return <Chrome />;
          case EDGE:
            return <Edge />;
          case SAFARI:
            return <Safari />;
          default:
            return null;
        }
      })(clickedBrowser)}
      <TutorialSection noImg step={8}>
        Return to this website and paste the HTML into the textbox above.
      </TutorialSection>
      <TutorialSection noImg step={9}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            Click the "Generate timetable" button and enjoy your new timetable!
          </div>
          <a href="#top" id="move-to-top">
            Move to Top
          </a>
        </div>
      </TutorialSection>
    </div>
  );
};

const BoldText = ({ children }: { children: JSX.Element | string }) => (
  <span style={{ fontFamily: "open-sans, sans-serif", fontWeight: 700 }}>
    {children}
  </span>
);

const Firefox = () => {
  return (
    <>
      <TutorialSection
        step={6}
        alt="The context menu is open and the user is hovering over the inspect button"
        src={rightClickInspectFirefox}
      >
        Right click on the whitespace to the right of your timetable and select
        inspect.
      </TutorialSection>
      <TutorialSection
        step={7}
        alt="User is copying the html from the page inspector."
        src={copyHTMLFirefox}
        tallImg
      >
        At the top of the Page Inspector, right click on the text that says:
        &nbsp;
        <div className="code">
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
        .
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
        step={6}
        alt="The context menu is open and the user is hovering over the inspect button"
        src={rightClickInspectChrome}
      >
        Right click on the whitespace to the right of your timetable and select
        inspect.
      </TutorialSection>
      <TutorialSection
        step={7}
        alt="User is copying the html from the page inspector."
        src={copyHTMLChrome}
        tallImg
      >
        At the top of the Page Inspector, right click on the text that
        says:&nbsp;
        <div className="code">
          <span style={{ color: "#A894A6" }}>&lt;</span>
          <span style={{ color: "#881280" }}>html&nbsp;</span>
          <span style={{ color: "#994500" }}>lang</span>
          <span style={{ color: "#A894A6" }}>="</span>
          <span style={{ color: "#1A1AA6" }}>en-gb</span>
          <span style={{ color: "#A894A6" }}>"&nbsp;</span>
          <span style={{ color: "#994500" }}>class</span>
          <span style={{ color: "#A894A6" }}>="</span>
          <span style={{ color: "#1A1AA6" }}>tablesaw-enhanced</span>
          <span style={{ color: "#A894A6" }}>"&gt;</span>
        </div>
        .
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
        step={6}
        alt="The context menu is open and the user is hovering over the inspect button"
        src={rightClickInspectEdge}
      >
        Right click on the whitespace to the right of your timetable and select
        inspect.
      </TutorialSection>
      <TutorialSection
        step={7}
        alt="User is copying the html from the page inspector."
        src={copyHTMLEdge}
      >
        At the top of the Page Inspector, right click on the text that
        says:&nbsp;
        <div className="code">
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
          <span style={{ color: "#4A69C9" }}>&gt;</span>
        </div>
        .
        <br />
        In the menu, hover over Copy and select Copy element.
      </TutorialSection>
    </>
  );
};

const Safari = () => {
  return (
    <>
      <TutorialSection
        step={6}
        alt="The context menu is open and the user is hovering over the inspect element button"
        src={rightClickInspectSafari}
      >
        Right click on the whitespace to the right of your timetable and select
        Inspect Element.
      </TutorialSection>
      <TutorialSection
        step={7}
        alt="User is copying the html from the page inspector"
        src={copyHTMLSafari}
      >
        At the top of the pageInspector, right click on the text that says:
        &nbsp;
        <div className="code">
          <span style={{ color: "#A50E8E" }}>&lt;html&nbsp;</span>
          <span style={{ color: "#816928" }}>lang</span>
          <span style={{ color: "#A50E8E" }}>="</span>
          <span style={{ color: "#C01816" }}>en-gb</span>
          <span style={{ color: "#A50E8E" }}>"&nbsp;</span>
          <span style={{ color: "#816928" }}>class</span>
          <span style={{ color: "#A50E8E" }}>="</span>
          <span style={{ color: "#C01816" }}>tablesaw-enhanced</span>
          <span style={{ color: "#A50E8E" }}>"&gt;</span>
        </div>
        .
        <br />
        In the menu, hover over Copy and select HTML.
      </TutorialSection>
    </>
  );
};

export default Tutorial;
