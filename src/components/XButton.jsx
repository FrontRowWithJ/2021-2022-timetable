import XButtonBG from "./svg/XButtonBG";
import "../css/x-button.css";

const XButton = ({ disableOverlay }) => {
  return (
    <div className="x-button-container" onClick={() => disableOverlay()}>
      <XButtonBG />
      <div className="x-button">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default XButton;
