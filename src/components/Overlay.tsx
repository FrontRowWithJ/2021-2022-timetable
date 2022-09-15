import "../css/overlay.css";

interface OverlayProps {
  disableOverlay: () => void;
  content: (d: { disableOverlay: () => void }) => JSX.Element;
}

const Overlay = ({ content, disableOverlay }: OverlayProps) => {
  return (
    <div
      className="overlay"
      onClick={({ target }) =>
        (target as HTMLDivElement).classList.contains("overlay") &&
        disableOverlay()
      }
    >
      {content({ disableOverlay })}
    </div>
  );
};

export default Overlay;
