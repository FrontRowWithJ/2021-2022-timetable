import React, { useRef } from "react";
import "../css/menu.css";

const Menu = ({ children }) => {
  const list = ["first", "middle", "last"];
  const kebabRef = list.map(() => React.createRef(null));
  const menuRef = useRef(null);
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
          onClick={() => {
            kebabRef.forEach(({ current }, i) => {
              current.classList.toggle(`anim-${list[i]}-forward`);
              current.classList.toggle(`anim-${list[i]}-backward`);
            });
            menuRef.current.classList.toggle("anim-menu-forward");
            menuRef.current.classList.toggle("anim-menu-backward");
          }}
        >
          <div ref={kebabRef[0]} className="circle anim-first-backward"></div>
          <div ref={kebabRef[1]} className="circle anim-middle-backward"></div>
          <div ref={kebabRef[2]} className="circle anim-last-backward"></div>
        </div>
      </div>
      <div ref={menuRef} className="menu anim-menu-backward">
        <div className="menu-item-container">{children}</div>
      </div>
    </>
  );
};

export default Menu;
