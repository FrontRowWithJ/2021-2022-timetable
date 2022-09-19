import { CSSProperties } from "react";

export interface TutorialSectionProps {
  alt?: string;
  src?: string;
  noImg?: boolean;
  style?: React.CSSProperties;
  step?: number;
  tallImg?: boolean;
  children: (JSX.Element | string)[] | JSX.IntrinsicElements["div"] | string;
}

export interface TextContainerProps {
  style?: CSSProperties;
  step?: number;
  children: (JSX.Element | string)[] | JSX.IntrinsicElements["div"] | string;
}
