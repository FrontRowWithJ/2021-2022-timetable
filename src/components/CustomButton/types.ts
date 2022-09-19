import { MouseEvent } from "react";

export interface CustomButtonProps {
  onClick: (evt: MouseEvent) => void;
  text: string;
  id: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}
