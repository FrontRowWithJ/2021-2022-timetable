import { TimetableData } from "../../timetableData";

export interface HeaderProps {
  curr: number;
  isSwiping: boolean;
  setTransition: React.Dispatch<React.SetStateAction<boolean>>;
  isTransitioning: boolean;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  timetableData: TimetableData;
  setOverlay: React.Dispatch<React.SetStateAction<0 | 1>>;
}
