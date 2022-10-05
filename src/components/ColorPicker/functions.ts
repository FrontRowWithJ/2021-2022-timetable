import { useState } from "react";
import { defaultSettings, ColorSetting, ColorSettings } from "../../misc";

type UseSettings = () => [
  ColorSettings,
  (newSetting: ColorSetting, focus: number) => void,
  () => void
];

export const useSettings: UseSettings = () => {
  const savedSettings = window.localStorage.getItem("color-settings");
  const [settings, set] = useState(
    savedSettings === null
      ? defaultSettings
      : (JSON.parse(savedSettings) as ColorSettings)
  );
  const setSettings = (newSetting: ColorSetting, focus: number) =>
    set(
      (setting) =>
        setting.map((st, i) => (i === focus ? newSetting : st)) as ColorSettings
    );
  return [settings, setSettings, () => set(defaultSettings)];
};

export const getPos = (
  { clientX, clientY }: { clientX: number; clientY: number },
  x: number,
  y: number,
  w: number,
  h: number
) => {
  return {
    left: Math.max(0, Math.min(clientX - x, w)),
    top: Math.max(0, Math.min(clientY - y, h)),
  };
};
