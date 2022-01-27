import "../css/reset-button.css";
import ResetIcon from "../resources/reset.svg";

const ResetButton = ({ resetTimetable }) => {
  return (
    <div
      className="reset-button text-box-button"
      onClick={() => resetTimetable()}
    >
      <img alt="reset-button" src={ResetIcon} />
    </div>
  );
};

export default ResetButton;
