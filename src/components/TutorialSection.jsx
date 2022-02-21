import { useRef, useState } from "react";
import "../css/tutorial-section.css";

const TutorialSection = (props) => {
  const { alt, src, children, noImg, step, style, tallImg } = props;
  const height = tallImg ? "50vh" : "";
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const overlayRef = useRef(null);
  return (
    <div
      className="tutorial-section-container"
      style={{ cursor: noImg ? "default" : "pointer" }}
      onClick={() => !isOverlayVisible && setOverlayVisibility(true)}
    >
      {!noImg && isOverlayVisible && (
        <div
          className="tutorial-overlay"
          ref={overlayRef}
          onClick={() => isOverlayVisible && setOverlayVisibility(false)}
        >
          <div>
            <img alt={alt} src={src} style={{ height }} />
            <TextContainer style={style} step={step} children={children} />
          </div>
        </div>
      )}
      {!noImg && (
        <div className="tutorial-img-container">
          <img alt={alt} src={src} />
        </div>
      )}
      <TextContainer style={style} step={step} children={children} />
    </div>
  );
};

const TextContainer = ({ style, step, children }) => (
  <div className="tutorial-text-container" style={style ? style : {}}>
    <div className="step-no">{step}</div>
    <div className="step">{children}</div>
  </div>
);

export default TutorialSection;
