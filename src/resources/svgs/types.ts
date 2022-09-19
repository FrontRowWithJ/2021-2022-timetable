import { CSSProperties } from "react";

export interface LogoProps {
  style: CSSProperties;
  onClick: () => void;
  onMouseOut: () => void;
  onMouseOver: () => void;
}
