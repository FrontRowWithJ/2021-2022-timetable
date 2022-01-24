import sanitizeHtml from "sanitize-html";

//! PARSE HTML TO GET TIMETABLE

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

export const HTMLToTimetable = (innerHTML) => {
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

export default HTMLToTimetable;
