//additonal optimisations can be made creating a list of the moduleCode,Lecturer,module and classRoom and then storing the
// corresponding number

export interface TimetableI {
  LECTURE: LectureType;
  TUTORIAL: LectureType;
  LABORATORY: LectureType;
  ONLINE_LIVE_EVENT: LectureType;
  ACTIVITIES: LectureNames[];
  DAYS: Day[];
}

export enum LectureType {
  LECTURE,
  TUTORIAL,
  LABORATORY,
  ONLINE_LIVE_EVENT,
}

export interface module {
  module: string;
  moduleCode: string;
  time: string;
  activePeriods: number[];
  activity: LectureType;
  lecturer: string;
  classroom: string[];
}

export const Timetable: TimetableI = {
  LECTURE: LectureType.LECTURE,
  TUTORIAL: LectureType.TUTORIAL,
  LABORATORY: LectureType.LABORATORY,
  ONLINE_LIVE_EVENT: LectureType.ONLINE_LIVE_EVENT,
  ACTIVITIES: ["Lecture", "Tutorial", "Laboratory", "Online Live Event"],
  DAYS: ["mon", "tue", "wed", "thu", "fri"],
};

export type Day = "mon" | "tue" | "wed" | "thu" | "fri";
type LectureNames = "Lecture" | "Tutorial" | "Laboratory" | "Online Live Event";
export type TimetableData = { [day in Day]: (module | module[])[] };

/*
const TimetableJSON: TimetableData = {
  mon: [
    {
      module: "ARTIFICIAL INTELLIGENCE I",
      moduleCode: " CSU33061 ",
      time: "09:00 - 10:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Rafael Timothy Fernando",
      classroom: ["JOLY4()"],
    },
    {
      module: "SOFTWARE ENGINEERING PROJECT II",
      moduleCode: " CSU33013 ",
      time: "10:00 - 11:00",
      activePeriods: [23, 27, 29, 33],
      activity: 0,
      lecturer: "Inmaculada Arnedillo-Sanchez",
      classroom: ["LB04(Lloyd Institute (INS Building))"],
    },
    {
      module: "INFORMATION MANAGEMENT II",
      moduleCode: " CSU34041 ",
      time: "13:00 - 14:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Yvette Graham",
      classroom: ["L2.15(TBSI)"],
    },
    {
      module: "SOFTWARE ENGINEERING PROJECT II",
      moduleCode: " CSU33013 ",
      time: "16:00 - 18:00",
      activePeriods: [22],
      activity: 0,
      lecturer: "Inmaculada Arnedillo-Sanchez",
      classroom: [
        "LB11(Lloyd Institute (INS Building))",
        "MACNEIL3(Hamilton Building)",
      ],
    },
  ],
  tue: [
    {
      module: "Toolkit for a Smart & Sustainable World",
      moduleCode: " TEU00282 ",
      time: "09:00 - 11:00",
      activePeriods: [22, 27, 29, 33],
      activity: 1,
      lecturer: "Siobhan Clarke",
      classroom: ["M21(Museum Building)"],
    },
    {
      module: "ARTIFICIAL INTELLIGENCE I",
      moduleCode: " CSU33061 ",
      time: "14:00 - 15:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Rafael Timothy Fernando",
      classroom: ["JOLY4()"],
    },
    {
      module: "CONCURRENT SYSTEMS I",
      moduleCode: " CSU33014 ",
      time: "16:00 - 17:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "David Gregg",
      classroom: ["LB01(Lloyd Institute (INS Building))"],
    },
  ],
  wed: [
    {
      module: "INFORMATION MANAGEMENT II",
      moduleCode: " CSU34041 ",
      time: "12:00 - 13:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Yvette Graham",
      classroom: ["MACNEIL3(Hamilton Building)"],
    },
    {
      module: "INFORMATION MANAGEMENT II",
      moduleCode: " CSU34041 ",
      time: "13:00 - 14:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Yvette Graham",
      classroom: ["JOLY4()"],
    },
    {
      module: "COMPILER DESIGN I",
      moduleCode: " CSU33071 ",
      time: "16:00 - 18:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Aimee Borda",
      classroom: ["LB01(Lloyd Institute (INS Building))"],
    },
  ],
  thu: [
    {
      module: "COMPILER DESIGN I",
      moduleCode: " CSU33071 ",
      time: "09:00 - 10:00",
      activePeriods: [24, 27, 29, 33],
      activity: 2,
      lecturer: "John Waldron",
      classroom: ["LG35(O'Reilly Institute)", "LG36(O'Reilly Institute)"],
    },
    {
      module: "CONCURRENT SYSTEMS I",
      moduleCode: " CSU33014 ",
      time: "14:00 - 15:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "David Gregg",
      classroom: ["1.07(Lloyd Institute (INS Building))"],
    },
    {
      module: "CONCURRENT SYSTEMS I",
      moduleCode: " CSU33014 ",
      time: "15:00 - 16:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "David Gregg",
      classroom: ["1.07(Lloyd Institute (INS Building))"],
    },
  ],
  fri: [
    {
      module: "Toolkit for a Smart & Sustainable World",
      moduleCode: " TEU00282 ",
      time: "09:00 - 10:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Siobhan Clarke",
      classroom: ["M21(Museum Building)"],
    },
    {
      module: "ARTIFICIAL INTELLIGENCE I",
      moduleCode: " CSU33061 ",
      time: "14:00 - 15:00",
      activePeriods: [22, 27, 29, 33],
      activity: 0,
      lecturer: "Rafael Timothy Fernando",
      classroom: ["2037(Arts Building)"],
    },
  ],
};
*/
export default Timetable;
