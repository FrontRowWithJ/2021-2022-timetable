import { times } from "lodash";
import sanitizeHtml from "sanitize-html";

export const setScrollBar = (elem) => {
  const parent = elem.parentElement;
  parent.style.overflowY = canScroll(elem) ? "" : "hidden";
  parent.scrollTop = 0;
};

export const canScroll = (elem) => {
  const { bottom } = elem.getBoundingClientRect();
  return bottom > (window.innerHeight || document.documentElement.clientHeight);
};

const DAY_IN_MILLISECONDS = 86_400_000;

const getDateString = (date) => {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
  return `${day} ${date.getDate()} ${month} ${date.getFullYear()}`;
};

export const getWeekDayDates = () => {
  const currDay = new Date().getDay();
  const offset = (1 - currDay) * DAY_IN_MILLISECONDS;
  const monday = Date.now() + offset;
  return times(5, (i) => new Date(monday + DAY_IN_MILLISECONDS * i)).map(
    getDateString
  );
};

export const getLeft = (i, x) => (i - x) * 100 + "%";

export const isModuleOnThisWeek = (week, periods) => {
  for (let i = 0; i < periods.length; i += 2) {
    const [start, end] = [periods[i], periods[i + 1]];
    if (start <= week && week <= end) return true;
  }
  return false;
};

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

const GROUP_DELIMITER = "&";
const ENTRY_DELIMITER = "|";
const DAY_DELIMITER = "!";
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

const entryToJSON = (entry = "") => {
  const result = {};
  const values = entry.split(PROPERTY_DELIMITER);
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
const unminifyEntry = (entry = "") => {
  const res = entry.split(GROUP_DELIMITER).map(entryToJSON);
  return res.length === 1 ? res[0] : res;
};
const unminifyDay = (day = "") => {
  const entries = day.split(ENTRY_DELIMITER);
  return entries.map(unminifyEntry);
};

export const unminifyTimetable = (compressed = "") => {
  const result = {};
  const _days = compressed.split(DAY_DELIMITER);
  days.forEach((day, i) => (result[day] = unminifyDay(_days[i])));
  return result;
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

const abbrevDay = (day = "") => {
  return {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
  }[day];
};
const activities = {
  LECTURE: 0,
  TUTORIAL: 1,
  LABORATORY: 2,
  "ONLINE LIVE EVENT": 3,
};
export const generateTimetableJSON = (innerHTML) => {
  const timetableDocument = document.getElementById("dummy");
  const t = sanitizeHtml(innerHTML, { allowedAttributes: false });
  timetableDocument.innerHTML = t;
  const ttb_timetableTable = document.getElementById("ttb_timetableTable");
  const table = [...ttb_timetableTable.children][0];
  const tbody = [...table.children].filter((n) => n.nodeName === "TBODY")[0];
  const trs = [...tbody.children];
  const timetable = { mon: [], tue: [], wed: [], thu: [], fri: [] };
  trs.forEach((tr) => {
    const tds = [...tr.children].filter((td) =>
      [...td.classList].some((className) => className === "fullBorder")
    );
    tds.forEach((td) => {
      const text = td.getAttribute("onmouseover");
      const moduleInfo = text.match(/'.+'/g)[0];
      const res = [];
      ["Module:", "Date:", "Time:"].reduce((prev, curr) => {
        const s = prev.substring(prev.indexOf(curr) + curr.length);
        const data = s.substring(0, s.indexOf("<")).trim();
        res.push(data);
        return s;
      }, moduleInfo);
      const [name, day, time] = res;
      const span = td.children[0];
      const strong = span.children[0];
      const weeks = strong.innerHTML
        .substring(strong.innerHTML.indexOf(";") + 1)
        .replace(/[-,]/g, "*");
      const weekPeriods = weeks
        .split("*")
        .map((num) => parseInt(num.trim(), 10));
      const moduleCode = td.children[2].innerHTML.replace(/\n/g, "");
      const innerHTML = td.innerHTML;
      const room_regex = /Room:/g;

      const [size, group, activity, lecturer] = [
        "Size: ",
        "Group: ",
        "Activity: ",
        "Lecturer: ",
      ].map((string) => {
        const regex = new RegExp(string, "g");
        const regExec = regex.exec(innerHTML);
        if (regExec) {
          const idx = regExec.index;
          const tmp = innerHTML.substring(idx + string.length);
          return tmp.substring(0, tmp.indexOf("<"));
        }
        return "";
      });
      const rooms = [];
      let regexResult;
      while ((regexResult = room_regex.exec(innerHTML))) {
        const { index } = regexResult;
        const tmp = innerHTML.substring(index);
        const room = tmp.substring(
          tmp.indexOf('">') + '">'.length,
          tmp.indexOf("</a>")
        );
        rooms.push(room);
      }

      const moduleEntry = {
        module: name,
        moduleCode: moduleCode,
        time: time.replace(/ /g, "").replace("-", " - "),
        activePeriods: weekPeriods,
        size: size,
        group: group,
        activity: activities[activity.toUpperCase()],
        lecturer: lecturer,
        // isOnline: to be determined,
        classroom: rooms.length !== 0 ? rooms : ["Blackboard"],
        isOnline: rooms.length === 0,
      };
      timetable[abbrevDay(day)].push(moduleEntry);
    });
  });
  Object.keys(timetable).forEach((day) => {
    const modules = timetable[day];
    const newList = [];
    let t = modules[0].time;
    let tmpArray = [];
    for (const entry of modules) {
      if (entry.time === t) tmpArray.push(entry);
      else {
        newList.push(tmpArray.length === 1 ? tmpArray[0] : tmpArray);
        tmpArray = [];
        tmpArray.push(entry);
        t = entry.time;
      }
    }
    newList.push(tmpArray.length === 1 ? tmpArray[0] : tmpArray);
    timetable[day] = newList;
  });
  return timetable;
};
