import { TimetableData } from "../../timetableData";

export interface LandingProps {
  enableTimetable: React.Dispatch<React.SetStateAction<boolean>>;
  setTimetable: React.Dispatch<React.SetStateAction<TimetableData | null>>;
}
