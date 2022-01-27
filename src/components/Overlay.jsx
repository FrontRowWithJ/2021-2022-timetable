import { useEffect, useRef } from "react";
import "../css/overlay.css";

const Overlay = ({ setOverlay, isOverlayEnabled, content }) => {
  const urlContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const toggleOverlay = (isEnabled) => {
    const { current: overlay } = overlayRef;
    const { current: urlContainer } = urlContainerRef;
    if (isEnabled) {
      overlay.classList.add("show-overlay");
      urlContainer && urlContainer.classList.add("translate-copy-button");
    } else {
      overlay.classList.remove("show-overlay");
      urlContainer && urlContainer.classList.remove("translate-copy-button");
    }
  };
  useEffect(() => toggleOverlay(isOverlayEnabled), [isOverlayEnabled]);
  useEffect(() => {
    const { current: div } = urlContainerRef;
    const removeOverlay = () => {
      if (!div.classList.contains("translate-copy-button")) setOverlay(false);
    };
    div.addEventListener("transitionend", removeOverlay);
    return () => div.removeEventListener("transitionend", removeOverlay);
  }, [setOverlay]);
  return (
    <div
      className="overlay"
      ref={overlayRef}
      onClick={({ target }) => {
        if (target.classList.contains("overlay")) toggleOverlay(false);
      }}
    >
      {content({
        urlContainerRef: urlContainerRef,
        disableOverlay: () => toggleOverlay(false),
      })}
    </div>
  );
};

export default Overlay;
