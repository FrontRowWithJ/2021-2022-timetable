import { TimetableData } from "../../timetableData";
import { overlayType } from "../Overlay";

export interface TimetableWebpageProps {
  timetableData: TimetableData;
  overlay: overlayType;
  setOverlay: React.Dispatch<React.SetStateAction<overlayType>>;
}
