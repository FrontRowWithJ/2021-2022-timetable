import { MouseEvent } from "react";
import "../css/custom-button.css";

interface CustomButtonProps {
  onClick: (evt: MouseEvent) => void;
  text: string;
  id: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const CustomButton = ({ onClick, text, id, buttonRef }: CustomButtonProps) => {
  return (
    <div className="button-container" id={id}>
      <button type="button" onClick={onClick} ref={buttonRef}>
        {text}
      </button>
      <div></div>
      <div></div>
    </div>
  );
};

export default CustomButton;
