import { useRef } from "react";
import "./menu-item.css";
import CustomButton from "../CustomButton";
import { noop } from "./functions";
import { MenuItemProps } from "./types";

const MenuItem = ({ text, onClick, disabled, onMouseDown }: MenuItemProps) => {
  const evtHandler = onMouseDown ?? noop;
  const buttonRef = useRef<HTMLButtonElement>(null);
  onClick = onClick && !disabled ? onClick : noop;
  const id = disabled ? "disabled" : "";
  return (
    <div
      className="menu-item"
      style={{ opacity: disabled ? 0.3 : 1 }}
      onMouseDown={evtHandler}
      onTouchStart={evtHandler}
    >
      <CustomButton {...{ buttonRef, text, onClick, id }} />
    </div>
  );
};

export default MenuItem;
