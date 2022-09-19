import { TouchEvent, MouseEvent } from "react";
import { decompressTimetable, compressTimetable } from "./compressTimetable";

export const [CHROME, SAFARI, EDGE, FIREFOX] = [0, 1, 2, 3] as const;
export const [DEFAULT, CUSTOMIZE] = [0, 1] as const;
export const ACTIVITIES = [
  "Lecture",
  "Tutorial",
  "Laboratory",
  "Online Live Event",
] as const;

export const canScroll = (elem: HTMLDivElement) =>
  elem.getBoundingClientRect().bottom >
  (window.innerHeight || document.documentElement.clientHeight);

export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";

export const base64ToURLSafe = (str: string) =>
  str.replaceAll(
    /[+/=]/g,
    (match) => ({ "+": ".", "/": "_", "=": "-" }[match] as string)
  );

export const URLSafetoBase64 = (str: string) =>
  str.replaceAll(
    /[._-]/g,
    (match) => ({ ".": "+", _: "/", "-": "=" }[match] as string)
  );

export const getBaseURL = (url = window.location) =>
  `${url.protocol}//${url.host}/${url.pathname.split("/")[1]}`;

export type Event = TouchEvent | MouseEvent;

export const isTouchEvent = ({ type }: Event) => !/[Mm]ouse/i.test(type);

export const getEvent = (event: Event) =>
  isTouchEvent(event)
    ? (event as TouchEvent).touches[0]
    : (event as MouseEvent);

export const isPinching = ({ touches }: TouchEvent) => touches.length > 1;

export const setTimetableLocalStorage = (queryString: string) => {
  const urlParams = new URLSearchParams(queryString);
  const timetableBase64 = urlParams.get("timetable");
  if (timetableBase64) {
    const base64 = URLSafetoBase64(timetableBase64);
    const timetable = decompressTimetable(base64, "Base64");
    const storageString = compressTimetable(timetable, "StorageBinaryString");
    const localStorageString = window.localStorage.getItem("timetable");
    if (localStorageString !== storageString)
      window.localStorage.setItem("timetable", storageString);
    return storageString;
  }
  return null;
};
