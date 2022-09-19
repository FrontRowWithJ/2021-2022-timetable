import { TimetableData } from "../../timetableData";

export interface TimetableProps {
  isTransitioning: boolean;
  curr: number;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  setSwiping: React.Dispatch<React.SetStateAction<boolean>>;
  tableRefs: React.RefObject<HTMLDivElement>[];
  timetableData: TimetableData;
  isSwiping: boolean;
}
