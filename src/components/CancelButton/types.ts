import { MouseEvent } from "react";

export interface CancelButtonProps {
  onClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}
