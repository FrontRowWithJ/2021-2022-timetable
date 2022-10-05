import React, { useEffect, useRef, useState } from "react";
import "./color-picker.css";
import {
  ACTIVITIES,
  getTextColor,
  hsl2rgb,
  colorLuminance,
  defaultSettings,
  hex2rgb,
  getEvent,
  ColorSetting,
  Event,
  times,
} from "../../misc";
import CancelButton from "../CancelButton";
import CustomButton from "../CustomButton";
import { TRANSITION_TIME } from "./constants";
import { getPos, useSettings } from "./functions";
import { ColorPickerProps } from "./types";

const ColorPicker = ({ disableOverlay }: ColorPickerProps) => {
  const [focus, setFocus] = useState(0);
  const [pickerPos, setPickerPos] = useState({ left: "0", top: "0" });
  const [backgroundColor, setBGColor] = useState("#FF0000");
  const [sliderPos, setSliderPos] = useState("0");
  const pickerAreaRef = useRef<HTMLDivElement>(null);
  const sliderAreaRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings, setTODefault] = useSettings();
  const hasSliderPressed = useRef<boolean>(false);
  const hasPickerPressed = useRef<boolean>(false);

  const setPicker = (evt: Event) => {
    if (pickerAreaRef.current) {
      const { x, y, right, bottom } =
        pickerAreaRef.current.getBoundingClientRect();
      pickerAreaRef.current.style.transitionDuration = "";
      hasPickerPressed.current = true;
      const [w, h] = [right - x, bottom - y];
      const { clientX, clientY } = getEvent(evt);
      const { left, top } = getPos({ clientX, clientY }, x, y, w, h);
      const { hue } = settings[focus];
      const sat = left / w;
      const lum = (1 - (left / w) * 0.5) * (1 - top / h);
      const backgroundColor = hsl2rgb(hue, sat, lum);
      const color = getTextColor(...hex2rgb(backgroundColor));
      setPickerPos({
        left: `${(left * 100) / w}%`,
        top: `${(top * 100) / h}%`,
      });
      setSettings({ hue, sat, lum, backgroundColor, color }, focus);
    }
  };

  const setSlider = (evt: Event) => {
    if (sliderAreaRef.current) {
      sliderAreaRef.current.style.transitionDuration = "";
      hasSliderPressed.current = true;
      const { x, right } = sliderAreaRef.current.getBoundingClientRect();
      const { clientX } = getEvent(evt);
      const w = right - x;
      const left = Math.max(0, Math.min(clientX - x, w));
      const hue = left / w;
      const { sat, lum } = settings[focus];
      const backgroundColor = hsl2rgb(hue, sat, lum);
      const color = getTextColor(...hex2rgb(backgroundColor));
      setSliderPos(`${(left / w) * 100}%`);
      setSettings({ hue, sat, lum, color, backgroundColor }, focus);
      setBGColor(hsl2rgb(hue));
    }
  };

  const setColorPicker = (setting: ColorSetting) => {
    if (pickerAreaRef.current && sliderAreaRef.current) {
      const { sat, lum, hue } = setting;
      const { x, y, right, bottom } =
        pickerAreaRef.current.getBoundingClientRect();
      const [w, h] = [right - x, bottom - y];
      const left = sat * w;
      const top = h - (2 * w * h * lum) / (2 * w - left);
      const { x: sliderX, right: sliderRight } =
        sliderAreaRef.current.getBoundingClientRect();
      const width = sliderRight - sliderX;
      const l = `${(left * 100) / w}%`;
      const t = `${(top * 100) / h}%`;
      setPickerPos({ left: l, top: t });
      setBGColor(hsl2rgb(hue));
      setSliderPos(`${(width * hue * 100) / w}%`);
    }
  };

  useEffect(() => {
    const onmousemove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      const { current: slider } = sliderRef;
      const { current: picker } = pickerRef;
      if (slider && hasSliderPressed.current) setSlider(e);
      if (picker && hasPickerPressed.current) setPicker(e);
    };
    const ontouchmove = onmousemove;
    document.addEventListener("mousemove", onmousemove);
    document.addEventListener("touchmove", ontouchmove);

    const onmouseup = () => {
      hasSliderPressed.current = hasPickerPressed.current = false;
      document.removeEventListener("mousemove", onmousemove);
      document.removeEventListener("touchmove", ontouchmove);
    };

    const ontouchend = onmouseup;
    document.addEventListener("mouseup", onmouseup);
    document.addEventListener("touchend", ontouchend);

    return () => {
      document.removeEventListener("mousemove", onmousemove);
      document.removeEventListener("touchmove", ontouchmove);
      document.removeEventListener("mouseup", onmouseup);
      document.removeEventListener("touchend", ontouchend);
    };
  });
  useEffect(() => setColorPicker(settings[focus]), [focus, settings]);

  const setToDefault = (evt: Event) => {
    const { target } = getEvent(evt);
    setTODefault();
    window.localStorage.removeItem("color-settings");
    setColorPicker(defaultSettings[focus]);
    const { current: slider } = sliderRef;
    const { current: picker } = pickerRef;
    if (slider && picker) {
      slider.style.transitionDuration =
        picker.style.transitionDuration = `${TRANSITION_TIME}ms`;
      setTimeout(() => {
        slider.style.transitionDuration = picker.style.transitionDuration = "";
      }, TRANSITION_TIME);
      (target as HTMLDivElement).textContent = "Defaulted!";
      setTimeout(
        () => ((target as HTMLDivElement).textContent = "Set to Default"),
        600
      );
    }
  };

  return (
    <div className="customizer">
      <div className="preview">
        {ACTIVITIES.map((activity, i) => (
          <div
            key={activity}
            style={{
              color: settings[i].color,
              backgroundColor: settings[i].backgroundColor,
              opacity: i === focus ? 1 : 0.5,
            }}
            onClick={() => {
              const { current: slider } = sliderRef;
              const { current: picker } = pickerRef;
              if (slider && picker) {
                slider.style.transitionDuration =
                  picker.style.transitionDuration = `${TRANSITION_TIME}ms`;
                setTimeout(() => {
                  slider.style.transitionDuration =
                    picker.style.transitionDuration = "";
                }, TRANSITION_TIME);
                setFocus(i);
              }
            }}
          >
            {activity}
            {times(2, (key) => (
              <div
                {...{ key }}
                className="bg-div"
                style={{ backgroundColor: settings[i].backgroundColor }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="color-picker">
        <CancelButton onClick={disableOverlay} />
        <div>
          <div
            className="picker-area"
            ref={pickerAreaRef}
            draggable="false"
            style={{ backgroundColor }}
            onMouseDown={setPicker}
            onTouchStart={setPicker}
          >
            <div className="picker-area-bg" draggable="false"></div>
            <div className="picker-area-bg" draggable="false"></div>
            <div
              className="picker-circle transition-circles"
              ref={pickerRef}
              draggable="false"
              style={{
                ...pickerPos,
                backgroundColor: settings[focus].backgroundColor,
                outlineColor: settings[focus].color,
              }}
            ></div>
          </div>
          <div
            className="color-slider"
            ref={sliderAreaRef}
            draggable="false"
            onMouseDown={setSlider}
            onTouchStart={setSlider}
          >
            <div
              className="slider-circle transition-circles"
              ref={sliderRef}
              style={{
                left: sliderPos,
                backgroundColor,
                boxShadow: `inset -5px -5px 10px 
              ${colorLuminance(backgroundColor, -0.3)},
               inset 5px 5px 10px ${colorLuminance(backgroundColor, 0.3)}`,
              }}
            ></div>
          </div>
          <CustomButton
            id="save-button-container"
            text="Save"
            onClick={({ target }) => {
              const button = target as HTMLButtonElement;
              if (button.textContent !== "Save") return;
              const colorSettings = JSON.stringify(settings);
              window.localStorage.setItem("color-settings", colorSettings);
              button.textContent = "Saved!";
              setTimeout(() => (button.textContent = "Save"), 600);
            }}
          />
          <button
            type="button"
            className="set-to-default-button"
            onMouseDown={setToDefault}
            onTouchStart={setToDefault}
          >
            Set to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
