import "./cancel-button.css";
import { CancelButtonProps } from "./types";

const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <button type="button" className="cancel-button" {...{ onClick }}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default CancelButton;
