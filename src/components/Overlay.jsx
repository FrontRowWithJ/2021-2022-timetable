import { useEffect, useRef } from "react";
import "../css/overlay.css";
import XButtonBG from "./svg/XButtonBG";

const Overlay = ({ text, setOverlay, isOverlayEnabled, textbox, button }) => {
  const xButtonRef = useRef(null);
  const urlContainerRef = useRef(null);
  const backdropRef = useRef(null);
  useEffect(() => {
    if (isOverlayEnabled) {
      backdropRef.current.classList.add("show-backdrop");
      urlContainerRef.current.classList.add("translate-copy-button");
    }
  });
  useEffect(() => {
    const { current: div } = urlContainerRef;
    const removeOverlay = () => {
      if (!div.classList.contains("translate-copy-button")) setOverlay(false);
    };
    div.addEventListener("transitionend", removeOverlay);
    return () => div.removeEventListener("transitionend", removeOverlay);
  });
  return (
    <div
      className="backdrop"
      ref={backdropRef}
      onClick={({ target }) => {
        if (target.classList.contains("backdrop")) {
          urlContainerRef.current.classList.remove("translate-copy-button");
          backdropRef.current.classList.remove("show-backdrop");
        }
      }}
    >
      <div className="url-container" ref={urlContainerRef}>
        <div
          className="x-button-container"
          onClick={() => {
            urlContainerRef.current.classList.remove("translate-copy-button");
            backdropRef.current.classList.remove("show-backdrop");
          }}
        >
          <XButtonBG className="x-button-bg" />
          <div
            className="x-button"
            ref={xButtonRef}
            onClick={() => {
              urlContainerRef.current.classList.remove("translate-copy-button");
            }}
          >
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="url-and-copy-button-container">
          {textbox({ className: "text-box", text: text })}
          {button({ id: "copy-button", text: text })}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
