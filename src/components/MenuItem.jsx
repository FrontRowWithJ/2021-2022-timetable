import { useEffect, useRef } from "react";
import "../css/menu-item.css";

const MenuItem = ({ text, onClick, disabled, onMouseDown }) => {
  const noop = () => {};
  const evtHandler = onMouseDown ?? noop;
  const buttonRef = useRef(null);
  useEffect(() => {
    if (disabled) buttonRef.current.style.cssText = "cursor: not-allowed";
  });
  const buttonStyle = disabled ? "" : "nice-button-style";
  return (
    <div
      className="menu-item"
      style={disabled ? { opacity: 0.3 } : {}}
      onMouseDown={evtHandler}
      onTouchStart={evtHandler}
    >
      <button
        className={buttonStyle}
        ref={buttonRef}
        type="button"
        onClick={onClick ? () => !disabled && onClick() : noop}
      >
        {text}
      </button>
      <div
        className={`bg-div ${buttonStyle}`}
        style={{ backgroundColor: "#585ce4" }}
      ></div>
      <div
        className={`bg-div ${buttonStyle}`}
        style={{ backgroundColor: "#585ce4" }}
      ></div>
    </div>
  );
};

export default MenuItem;
