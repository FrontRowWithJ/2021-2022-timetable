import "./overlay.css";
import { OverlayProps } from "./types";

const Overlay = ({ content, disableOverlay }: OverlayProps) => {
  return (
    <div
      className="overlay"
      onClick={({ target }) =>
        (target as HTMLDivElement).classList.contains("overlay") &&
        disableOverlay()
      }
    >
      {content(disableOverlay)}
    </div>
  );
};

export default Overlay;
