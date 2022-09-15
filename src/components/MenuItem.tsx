import { useEffect, useRef } from "react";
import "../css/menu-item.css";
import CustomButton from "./CustomButton";

interface MenuItemProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  onMouseDown?: () => void;
}

const MenuItem = ({ text, onClick, disabled, onMouseDown }: MenuItemProps) => {
  const noop = () => {};
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
        buttonRef={buttonRef}
        onClick={onClick ? () => !disabled && onClick() : noop}
        text={text}
      />
    </div>
  );
};

export default MenuItem;
