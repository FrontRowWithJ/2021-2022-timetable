import { TimetableData } from "../../timetableData";
import { overlayType } from "../Overlay";

export interface HeaderProps {
  curr: number;
  isSwiping: boolean;
  setTransition: React.Dispatch<React.SetStateAction<boolean>>;
  isTransitioning: boolean;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  timetableData: TimetableData;
  setOverlay: React.Dispatch<React.SetStateAction<overlayType>>;
}