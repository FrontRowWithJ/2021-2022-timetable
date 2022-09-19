import { useState } from "react";
import { defaultSettings, ColorSettings } from "../../misc";

export const useSettings = () => {
  const savedSettings = window.localStorage.getItem("color-settings");
  const [settings, set] = useState(
    savedSettings === null ? defaultSettings : JSON.parse(savedSettings)
  );
  const setSettings = (obj: ColorSettings, focus: number) => {
    const newSettings = [...settings];
    newSettings[focus] = obj;
    set(newSettings);
  };
  return [settings, setSettings, () => set(defaultSettings)];
};

export const getPos = (
  { clientX, clientY }: { clientX: number; clientY: number },
  x: number,
  y = 0,
  w: number,
  h: number
) => {
  return {
    left: Math.max(0, Math.min(clientX - x, w)),
    top: Math.max(0, Math.min(clientY - y, h)),
  };
};
