export interface OverlayProps {
  disableOverlay: () => void;
  content: (d: { disableOverlay: () => void }) => JSX.Element;
}
