import "./custom-button.css";
import { CustomButtonProps } from "./types";

const CustomButton = ({ onClick, text, id, buttonRef }: CustomButtonProps) => {
  const type = "button";
  const ref = buttonRef;
  const style = { cursor: id === "disabled" ? "not-allowed" : "" };
  return (
    <div className="button-container" id={id}>
      <button {...{ onClick, type, ref, style }}>{text}</button>
      <div></div>
      <div></div>
    </div>
  );
};

export default CustomButton;
