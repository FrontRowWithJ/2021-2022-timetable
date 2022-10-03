import { TouchEvent, MouseEvent } from "react";
import LZUTF8 from "lzutf8";
export const ACTIVITIES = [
  "Lecture",
  "Tutorial",
  "Laboratory",
  "Online Live Event",
] as const;

export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";

export const base64ToURLSafe = (s: string) =>
  s.replaceAll(/[+/=]/g, (match) => ({ "+": ".", "/": "_", "=": "-" }[match]!));

export const URLSafetoBase64 = (s: string) =>
  s.replaceAll(/[._-]/g, (match) => ({ ".": "+", _: "/", "-": "=" }[match]!));

export const getBaseURL = (url = window.location) =>
  `${url.protocol}//${url.host}/${url.pathname.split("/")[1]}`;

export type Event = TouchEvent | MouseEvent;

export const isTouchEvent = ({ type }: Event) => !/[Mm]ouse/i.test(type);

export const getEvent = (event: Event) =>
  isTouchEvent(event)
    ? (event as TouchEvent).touches[0]
    : (event as MouseEvent);

export const isPinching = ({ touches }: TouchEvent) => touches.length > 1;

const unminifyURL = async (urlParams: URLSearchParams) => {
  const hash = urlParams.get("short_url");
  if (hash) {
    const res = await fetch(
      `https://timetable-url-shortener.netlify.app/.netlify/functions/get_url_shortener?hash=${hash}`,
      { method: "GET" }
    );
    const text = await res.text();
    if (res.status !== 200) {
      console.error(text);
      return null;
    } else return text;
  } else return null
};

export const setTimetableLocalStorage = async (queryString: string) => {
  const urlParams = new URLSearchParams(queryString);
  const timetableBase64 = urlParams.get("timetable") ?? await unminifyURL(urlParams);
  if (timetableBase64) {
    const base64 = URLSafetoBase64(timetableBase64);
    const minified = LZUTF8.decompress(base64, {
      inputEncoding: "Base64",
      outputEncoding: "String",
    }) as string;
    const newStorageString = LZUTF8.compress(minified, {
      inputEncoding: "String",
      outputEncoding: "StorageBinaryString",
    }) as string;
    const oldStorageString = window.localStorage.getItem("timetable");
    if (oldStorageString !== newStorageString) {
      localStorage.setItem("timetable", newStorageString);
      localStorage.removeItem("short-url");
    }
    return newStorageString;
  }
  return null;
};
