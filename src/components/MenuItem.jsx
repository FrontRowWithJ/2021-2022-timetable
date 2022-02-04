import { useEffect, useRef } from "react";
import "../css/menu-item.css";
const MenuItem = ({ text, onclick, disabled, onmousedown }) => {
  const noop = () => {};
  const buttonRef = useRef(null);
  useEffect(() => {
    if (disabled)
      buttonRef.current.style.cssText =
        "font-size: unset !important; cursor: not-allowed";
  });

  return (
    <div
      className="menu-item"
      style={disabled ? { opacity: 0.3 } : {}}
      onMouseDown={onmousedown ? onmousedown : noop}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={onclick ? () => !disabled && onclick() : noop}
      >
        {text}
      </button>
      <div className="bg-div" style={{ backgroundColor: "#585ce4" }}></div>
      <div className="bg-div" style={{ backgroundColor: "#585ce4" }}></div>
    </div>
  );
};

export default MenuItem;
