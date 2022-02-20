import { useRef, useState } from "react";
import "../css/tutorial-section.css";

const TutorialSection = ({ alt, src, children, noImage, step, style }) => {
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const overlayRef = useRef(null);
  return (
    <div
      className="tutorial-section-container"
      style={{ cursor: noImage ? "default" : "pointer" }}
      onClick={() => !isOverlayVisible && setOverlayVisibility(true)}
    >
      {!noImage && isOverlayVisible && (
        <div
          className="tutorial-overlay"
          ref={overlayRef}
          onClick={() => isOverlayVisible && setOverlayVisibility(false)}
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
