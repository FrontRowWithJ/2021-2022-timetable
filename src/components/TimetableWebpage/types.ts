import { TimetableData } from "../../timetableData";

export interface TimetableWebpageProps {
  timetableData: TimetableData;
  overlay: 0 | 1;
  setOverlay: React.Dispatch<React.SetStateAction<0 | 1>>;
}
