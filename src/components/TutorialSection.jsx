import { useEffect, useRef, useState } from "react";
import "../css/tutorial-section.css";

const TutorialSection = ({ alt, src, children, noImage, step, style }) => {
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const overlayRef = useRef(null);
  useEffect(() => {
    if (overlayRef.current) {
      const { current: div } = overlayRef;
      div.style.opacity = opacity;
    }
  }, [opacity]);
  return (
    <div
      className="tutorial-section-container"
      style={{ cursor: noImage ? "default" : "pointer" }}
      onClick={() =>
        !isOverlayVisible &&
        !opacity &&
        (setOpacity(1) || setOverlayVisibility(true))
      }
    >
      {!noImage && isOverlayVisible && (
        <div
          className="tutorial-overlay"
          ref={overlayRef}
          onClick={() =>
            isOverlayVisible &&
            opacity &&
            (setOpacity(0) ||
              setTimeout(() => setOverlayVisibility(false), 600))
          }
        >
          <div>
            <img alt={alt} src={src}></img>
            <div className="tutorial-text-container" style={style ? style : {}}>
              <div className="step-no">{step}</div>
              <div className="step">{children}</div>
            </div>
          </div>
        </div>
      )}
      {!noImage && (
        <div className="tutorial-img-container">
          <img alt={alt} src={src} />
        </div>
      )}
      <div className="tutorial-text-container" style={style ? style : {}}>
        <div className="step-no">{step}</div>
        <div className="step">{children}</div>
      </div>
    </div>
  );
};

export default TutorialSection;
