import LZUTF8 from "lzutf8";
import { Day, LectureType, module, TimetableData } from "../timetableData";

const keys: (keyof module)[] = [
  "module",
  "moduleCode",
  "time",
  "activePeriods",
  "activity",
  "lecturer",
  "classroom",
]; //! The order of keys matters!

const WEEKDAYS: readonly Day[] = ["mon", "tue", "wed", "thu", "fri"] as const;
const GROUP_DELIMITER = "{";
const ENTRY_DELIMITER = "|";
const DAY_DELIMITER = ";";
const PROPERTY_DELIMITER = ",";

const areStrArraysEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((s, i) => s === b[i]);

const minifyTime = (time: string) => {
  const [start, end] = [...time.matchAll(/([0-9]+):/g)].map((t) => +t[1]);
  const s = (start + "").padStart(2, "0");
  return s + (end - start !== 1 ? end - start : "");
};

const minifyEntry = (entry: module) => {
  const result: (string | LectureType)[] = [];
  keys.forEach((key) => {
    switch (key) {
      case "time":
        result.push(minifyTime(entry[key]));
        break;
      case "activePeriods":
        result.push(entry[key].join("_"));
        break;
      case "classroom":
        if (areStrArraysEqual(["Blackboard"], entry[key])) {
          result.push("b");
        } else result.push(entry[key].join("_"));
        break;
      default:
        result.push(entry[key]);
    }
  });
  return result.join(PROPERTY_DELIMITER);
};

const minifyDay = (day: (module | module[])[]) => {
  return day
    .map((entry) =>
      Array.isArray(entry)
        ? entry.map(minifyEntry).join(GROUP_DELIMITER)
        : minifyEntry(entry)
    )
    .join(ENTRY_DELIMITER);
};

export const minifyTimetable = (timetable: TimetableData) =>
  WEEKDAYS.map((day) => minifyDay(timetable[day])).join(DAY_DELIMITER);

const lectureToJSON = (lecture: string) => {
  const result = {} as module;
  const unParsedModuleValues = lecture.split(PROPERTY_DELIMITER);

  keys.forEach((key, i) => {
    switch (key) {
      case "time":
        const time = unParsedModuleValues[i];
        const startStr = time.substring(0, 2);
        const start = parseInt(startStr);
        const end = start + (time.length === 2 ? 1 : parseInt(time.charAt(2)));
        const finalTime = `${startStr}:00 - ${(end + "").padStart(2, "0")}:00`;
        result[key] = finalTime;
        break;
      case "activePeriods":
        result[key] = unParsedModuleValues[i].split("_").map(Number);
        break;
      case "activity":
        result[key] = parseInt(unParsedModuleValues[i]);
        break;
      case "classroom":
        if (unParsedModuleValues[i] === "b") result[key] = ["Blackboard"];
        else result[key] = unParsedModuleValues[i].split("_");
        break;
      default:
        result[key] = unParsedModuleValues[i];
    }
  });
  return result;
};

const unminifyLecture = (lecture: string) => {
  const res = lecture.split(GROUP_DELIMITER).map(lectureToJSON);
  return res.length === 1 ? res[0] : res;
};

const unminifyDay = (day: string) =>
  day.split(ENTRY_DELIMITER).map(unminifyLecture);

export const unminifyTimetable = (minified: string) => {
  const result = {} as TimetableData;
  const _days = minified.split(DAY_DELIMITER);
  WEEKDAYS.forEach(
    (day, i) => (result[day] = _days[i] !== "" ? unminifyDay(_days[i]) : [])
  );
  return result;
};

type outputEncoding = "StorageBinaryString" | "Base64";
type inputEncoding = outputEncoding;
export const compressTimetable = (
  timetable: TimetableData,
  outputEncoding: outputEncoding
) => {
  const minified = minifyTimetable(timetable);
  return LZUTF8.compress(minified, { outputEncoding }) as string;
};

export const decompressTimetable = (
  compressed: string,
  inputEncoding: inputEncoding
) => {
  const minified = LZUTF8.decompress(compressed, {
    inputEncoding,
    outputEncoding: "String",
  });
  return unminifyTimetable(minified);
};
