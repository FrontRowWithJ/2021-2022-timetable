import { useEffect, useRef } from "react";
import "../css/menu-item.css";
import CustomButton from "./CustomButton";
const MenuItem = ({ text, onClick, disabled, onMouseDown }) => {
  const noop = () => {};
  const evtHandler = onMouseDown ?? noop;
  const buttonRef = useRef(null);
  useEffect(() => {
    if (disabled) buttonRef.current.style.cssText = "cursor: not-allowed";
  });
  return (
    <div
      className="menu-item"
      style={disabled ? { opacity: 0.3 } : {}}
      onMouseDown={evtHandler}
      onTouchStart={evtHandler}
    >
      <CustomButton
        id={disabled ? "disabled" : ""}
        buttonRef={buttonRef}
        type="button"
        onClick={onClick ? () => !disabled && onClick() : noop}
        text={text}
        backgroundColor="#585ce4"
      />
    </div>
  );
};

export default MenuItem;
