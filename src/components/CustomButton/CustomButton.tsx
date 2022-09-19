import "./custom-button.css";
import { CustomButtonProps } from "./types";

const CustomButton = ({ onClick, text, id, buttonRef }: CustomButtonProps) => {
  return (
    <div className="button-container" id={id}>
      <button type="button" {...{ onClick }} ref={buttonRef}>
        {text}
      </button>
      <div></div>
      <div></div>
    </div>
  );
};

export default CustomButton;
