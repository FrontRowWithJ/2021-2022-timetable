const keys = [
  "module",
  "moduleCode",
  "time",
  "activePeriods",
  "size",
  "group",
  "activity",
  "lecturer",
  "classroom",
];

const days = ["mon", "tue", "wed", "thu", "fri"];
const GROUP_DELIMITER = "{";
const ENTRY_DELIMITER = "|";
const DAY_DELIMITER = ";";
const PROPERTY_DELIMITER = ",";

const toNum = (s) => parseInt(s.substring(0, 2));

const areStrArraysEqual = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) if (a[i] !== b[i]) return false;
  return true;
};

const minifyTime = (t = "") => {
  const times = [...t.matchAll(/[0-9]+:/g)];
  const _t = times.map((time) => time[0].substring(0, 2)).map(toNum);
  return (
    (_t[0] + "").padStart(2, "0") +
    (_t[1] - _t[0] !== 1 ? `${_t[1] - _t[0]}` : "")
  );
};

const minifyEntry = (entry) => {
  const result = [];
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

const minifyDay = (day) => {
  return day
    .map((entry) =>
      Array.isArray(entry)
        ? entry.map(minifyEntry).join(GROUP_DELIMITER)
        : minifyEntry(entry)
    )
    .join(ENTRY_DELIMITER);
};

const minifyTimetable = (timetable) =>
  days.map((day) => minifyDay(timetable[day])).join(DAY_DELIMITER);

const lectureToJSON = (lecture = "") => {
  const result = {};
  const values = lecture.split(PROPERTY_DELIMITER);
  keys.forEach((key, i) => {
    switch (key) {
      case "time":
        const time = values[i];
        const startStr = time.substring(0, 2);
        const start = parseInt(startStr);
        const end = start + (time.length === 2 ? 1 : parseInt(time.charAt(2)));
        const finalTime = `${startStr}:00 - ${(end + "").padStart(2, "0")}:00`;
        result[key] = finalTime;
        break;
      case "activePeriods":
        result[key] = values[i].split("_").map(toNum);
        break;
      case "activity":
        result[key] = parseInt(values[i]);
        break;
      case "classroom":
        if (values[i] === "b") result[key] = ["Blackboard"];
        else result[key] = values[i].split("_");
        break;
      default:
        result[key] = values[i];
    }
  });
  result["isOnline"] = result.classroom[0] === "Blackboard";
  return result;
};

const unminifyLecture = (lecture = "") => {
  const res = lecture.split(GROUP_DELIMITER).map(lectureToJSON);
  return res.length === 1 ? res[0] : res;
};

const unminifyDay = (day = "") => {
  const entries = day.split(ENTRY_DELIMITER);
  return entries.map(unminifyLecture);
};

const unminifyTimetable = (minified = "") => {
  const result = {};
  const _days = minified.split(DAY_DELIMITER);
  days.forEach((day, i) => (result[day] = unminifyDay(_days[i])));
  return result;
};

export const compressTimetable = (timetable, outputEncoding = "") => {
  if (outputEncoding !== "StorageBinaryString" && outputEncoding !== "Base64")
    throw new Error(
      "outputEncoding must be either StorageBinaryString or Base64"
    );
  const minified = minifyTimetable(timetable);

  // eslint-disable-next-line no-undef
  return LZUTF8.compress(minified, {
    outputEncoding: outputEncoding,
  });
};

export const decompressTimetable = (compressed = "", inputEncoding = "") => {
  if (inputEncoding !== "StorageBinaryString" && inputEncoding !== "Base64")
    throw new Error(
      "inputEncoding must be either StorageBinaryString or Base64"
    );
  // eslint-disable-next-line no-undef
  const minified = LZUTF8.decompress(compressed, {
    inputEncoding: inputEncoding,
    outputEncoding: "String",
  });
  return unminifyTimetable(minified);
};
