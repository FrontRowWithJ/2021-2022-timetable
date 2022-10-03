import LZUTF8 from "lzutf8";
import { type TimetableData } from "../timetableData";
import { minifyTimetable } from "./compressTimetable";
import { getBaseURL } from "./_misc";

export const minifyURL = async (
  timetableData: TimetableData,
  callback: (shortURL: string | null, err: string | null) => void
) => {
  const shortenedURL = localStorage.getItem("short-url");
  if (shortenedURL) return callback(shortenedURL, null);
  const minified = minifyTimetable(timetableData);
  const base64 = LZUTF8.compress(minified, {
    inputEncoding: "String",
    outputEncoding: "Base64",
  });
  const res = await fetch(
    "https://timetable-url-shortener.netlify.app/.netlify/functions/put_url_shortener",
    { method: "PUT", body: base64 }
  );
  if (res.status !== 200) return callback(null, await res.text());
  const timetableHash = await res.text();
  const shortURL = `${getBaseURL()}?short_url=${timetableHash}`;
  localStorage.setItem("short-url", shortURL);
  return callback(shortURL, null);
};
