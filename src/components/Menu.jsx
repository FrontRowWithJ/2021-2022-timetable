import React, { useRef, useState } from "react";
import "../css/menu.css";

const [SHOWN, HIDDEN] = [true, false];
const Menu = ({ children }) => {
  const list = ["first", "middle", "last"];
  const kebabRef = list.map(() => React.createRef(null));
  const menuRef = useRef(null);
  const [isMenuOpened, toggleMenu] = useState(false);
  const setMenu = (shouldShow) => {
    const [add, remove] = shouldShow
      ? ["forward", "backward"]
      : ["backward", "forward"];
    kebabRef.forEach(({ current }, i) => {
      current.classList.add(`anim-${list[i]}-${add}`);
      current.classList.remove(`anim-${list[i]}-${remove}`);
    });
    menuRef.current.classList.add(`anim-menu-${add}`);
    menuRef.current.classList.remove(`anim-menu-${remove}`);
    toggleMenu(shouldShow);
  };
  return (
    <>
      <div
        className="header-button-container"
        style={{
          overflow: "hidden",
          position: "absolute",
          left: "1rem",
          top: "1rem",
        }}
      >
        <div
          className="header-button"
          style={{
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: "0",
            zIndex: "3",
          }}
          onClick={() => (isMenuOpened ? setMenu(HIDDEN) : setMenu(SHOWN))}
        >
          <div ref={kebabRef[0]} className="circle anim-first-backward"></div>
          <div ref={kebabRef[1]} className="circle anim-middle-backward"></div>
          <div ref={kebabRef[2]} className="circle anim-last-backward"></div>
        </div>
      </div>
      <div ref={menuRef} className="menu anim-menu-backward">
        <div className="menu-item-container">{children}</div>
        <div
          className="cancel-area"
          style={{ display: isMenuOpened ? "" : "none" }}
          onClick={() => setMenu(HIDDEN)}
        ></div>
      </div>
    </>
  );
};

export default Menu;
