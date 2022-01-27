import XButton from "./XButton";
import "../css/url-container.css";
const URLContainer = ({ children, disableOverlay, urlContainerRef }) => {
  return (
    <div className="url-container" ref={urlContainerRef}>
      <XButton disableOverlay={disableOverlay} />
      <div className="url-and-copy-button-container">{children}</div>
    </div>
  );
};

export default URLContainer;
