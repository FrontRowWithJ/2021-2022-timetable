import "../css/reset-button.css";
import ResetIcon from "../resources/reset.svg";

const ResetButton = ({ id, resetTimetable }) => {
  return (
    <div className="reset-button" id={id} onClick={() => resetTimetable()}>
      <img alt="reset-button" src={ResetIcon}/>
    </div>
  );
};

export default ResetButton;
