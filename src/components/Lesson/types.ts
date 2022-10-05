import { ColorSettings } from "../../misc";
import { module } from "../../timetableData";

export interface LessonProps {
  index: number;
  currDay: number;
  hour: number;
  lesson: module;
  settings: ColorSettings;
}