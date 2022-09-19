import { useEffect, useRef } from "react";
import "./menu-item.css";
import CustomButton from "../CustomButton";
import { noop } from "./functions";
import { MenuItemProps } from "./types";

const MenuItem = ({ text, onClick, disabled, onMouseDown }: MenuItemProps) => {
  const evtHandler = onMouseDown ?? noop;
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (disabled && buttonRef.current)
      buttonRef.current.style.cssText = "cursor: not-allowed";
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
        {...{ buttonRef, text }}
        onClick={onClick ? () => !disabled && onClick() : noop}
      />
    </div>
  );
};

export default MenuItem;
