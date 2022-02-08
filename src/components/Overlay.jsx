import "../css/overlay.css";

const Overlay = ({ content, disableOverlay }) => {
  return (
    <div
      className="overlay"
      onClick={({ target }) =>
        target.classList.contains("overlay") && disableOverlay()
      }
    >
      {content({ disableOverlay })}
    </div>
  );
};

export default Overlay;
