import { useEffect, useRef, useState } from "react";
import "../css/color-picker.css";
import {
  ACTIVITIES,
  getTextColor,
  hsl2rgb,
  colorLuminance,
  defaultSettings,
  hex2rgb,
  getEvent,
} from "../misc";
import CancelButton from "./CancelButton";
const { max, min } = Math;

const useSettings = () => {
  const savedSettings = window.localStorage.getItem("color-settings");
  const [settings, set] = useState(
    savedSettings === null ? defaultSettings : JSON.parse(savedSettings)
  );
  const setSettings = (obj, focus) => {
    const newSettings = [...settings];
    newSettings[focus] = obj;
    set(newSettings);
  };
  return [settings, setSettings, () => set(defaultSettings)];
};

const ColorPicker = ({ onClick }) => {
  const [focus, setFocus] = useState(0);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [backgroundColor, setBGColor] = useState("#FF0000");
  const [sliderPos, setSlider] = useState(0);
  const colorPickerRef = useRef(null);
  const colorSliderRef = useRef(null);
  const sliderCircle = useRef(null);
  const pickerCircle = useRef(null);
  const [settings, setSettings, resetSettings] = useSettings();
  const mousemoves = useRef([]);
  const touchmoves = useRef([]);

  const isMouseEvent = useRef(false);
  const isTouchEvent = useRef(false);
  const setPickerCircle = (evt) => {
    const { x, y, right, bottom } =
      colorPickerRef.current.getBoundingClientRect();
    const [w, h] = [right - x, bottom - y];
    const { clientX, clientY } = getEvent(evt);
    const { left, top } = getPos({ clientX, clientY }, x, y, w, h);
    const { hue } = settings[focus];
    const sat = left / w;
    const lum = (1 - (left / w) * 0.5) * (1 - top / h);
    const color = hsl2rgb(hue, sat, lum);
    const txtColor = getTextColor(...hex2rgb(color));
    setPos({ left, top });
    setSettings({ hue, sat, lum, color, txtColor }, focus);
    evt.preventDefault();
    evt.stopPropagation();
  };

  const setSliderCircle = (evt) => {
    const { x, right } = colorSliderRef.current.getBoundingClientRect();
    const { clientX, clientY } = getEvent(evt);
    const w = right - x;
    const { left } = getPos({ clientX, clientY }, x, 0, right - x);
    const hue = left / w;
    const { sat, lum } = settings[focus];
    const color = hsl2rgb(hue, sat, lum);
    const txtColor = getTextColor(...hex2rgb(color));
    setSlider(left);
    setSettings({ hue, sat, lum, color, txtColor }, focus);
    setBGColor(hsl2rgb(hue));
    evt.preventDefault();
    evt.stopPropagation();
  };

  useEffect(() => {
    const removeMouseEvents = () => {
      while (mousemoves.current.length)
        document.removeEventListener("mousemove", mousemoves.current.shift());
      isMouseEvent.current = false;
    };

    const removeTouchEvents = () => {
      while (touchmoves.current.length)
        document.removeEventListener("touchmove", touchmoves.current.shift());
      isTouchEvent.current = false;
    };
    document.addEventListener("mouseup", removeMouseEvents);
    document.addEventListener("touchend", removeTouchEvents);
    return () => {
      document.removeEventListener("mouseup", removeMouseEvents);
      document.removeEventListener("touchend", removeTouchEvents);
    };
  });
  const setColorPicker = (setting) => {
    const { sat, lum, hue } = setting;
    const { x, y, right, bottom } =
      colorPickerRef.current.getBoundingClientRect();
    const [w, h] = [right - x, bottom - y];
    const left = sat * w;
    const top = h - (2 * w * h * lum) / (2 * w - left);
    const { x: sliderX, right: sliderRight } =
      colorSliderRef.current.getBoundingClientRect();
    const width = sliderRight - sliderX;
    setPos({ left, top });
    setBGColor(hsl2rgb(hue));
    setSlider(width * hue);
  };
  useEffect(() => {
    setColorPicker(settings[focus]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  const getPos = ({ clientX, clientY }, x, y = 0, w, h) => {
    return {
      left: max(0, min(clientX - x, w)),
      top: max(0, min(clientY - y, h)),
    };
  };
  const setToDefault = (evt) => {
    const { target } = getEvent(evt);
    resetSettings();
    window.localStorage.removeItem("color-settings");
    setColorPicker(defaultSettings[focus]);
    sliderCircle.current.classList.add("transition-circles");
    pickerCircle.current.classList.add("transition-circles");
    target.textContent = "Defaulted!";
    setTimeout(() => (target.textContent = "Set to Default"), 600);
  };

  return (
    <div className="customizer">
      <div className="preview">
        {ACTIVITIES.map((activity, i) => (
          <div
            key={activity}
            style={{
              color: settings[i].txtColor,
              backgroundColor: settings[i].color,
              opacity: i === focus ? 1 : 0.5,
            }}
            onClick={() => {
              setFocus(i);
              sliderCircle.current.classList.add("transition-circles");
              pickerCircle.current.classList.add("transition-circles");
            }}
          >
            {activity}
            <div
              className="bg-div"
              style={{ backgroundColor: settings[i].color }}
            ></div>

            <div
              className="bg-div"
              style={{ backgroundColor: settings[i].color }}
            ></div>
          </div>
        ))}
      </div>
      <div className="color-picker">
        <CancelButton onClick={onClick} />
        <div>
          <div
            className="picker-area"
            ref={colorPickerRef}
            draggable="false"
            style={{ backgroundColor }}
            onMouseDown={() => {
              if (!isMouseEvent.current) {
                mousemoves.current.push(setPickerCircle);
                document.addEventListener("mousemove", setPickerCircle);
                isMouseEvent.current = true;
              }
            }}
            onTouchStart={() => {
              if (!isTouchEvent.current) {
                touchmoves.current.push(setPickerCircle);
                document.addEventListener("touchmove", setPickerCircle);
                isTouchEvent.current = true;
              }
            }}
          >
            <div className="picker-area-bg" draggable="false"></div>
            <div className="picker-area-bg" draggable="false"></div>

            <div
              className="picker-circle"
              ref={pickerCircle}
              onTransitionEnd={({ target }) =>
                target.classList.remove("transition-circles")
              }
              draggable="false"
              style={{
                ...pos,
                backgroundColor: settings[focus].color,
                outlineColor: settings[focus].txtColor,
              }}
            ></div>
          </div>
          <div
            className="color-slider"
            ref={colorSliderRef}
            draggable="false"
            onMouseDown={() => {
              if (!isMouseEvent.current) {
                mousemoves.current.push(setSliderCircle);
                document.addEventListener("mousemove", setSliderCircle);
                isMouseEvent.current = true;
              }
            }}
            onTouchStart={() => {
              if (!isTouchEvent.current) {
                touchmoves.current.push(setSliderCircle);
                document.addEventListener("touchmove", setSliderCircle);
                isTouchEvent.current = true;
              }
            }}
          >
            <div
              className="slider-circle"
              ref={sliderCircle}
              onTransitionEnd={({ target }) =>
                target.classList.remove("transition-circles")
              }
              style={{
                left: sliderPos,
                backgroundColor,
                boxShadow: `inset -5px -5px 10px 
              ${colorLuminance(backgroundColor, -0.3)},
               inset 5px 5px 10px ${colorLuminance(backgroundColor, 0.3)}`,
              }}
            ></div>
          </div>
          <div className="save-button-container">
            <button
              className="save-button"
              type="button"
              onClick={(evt) => {
                const { target: button } = evt;
                if (button.textContent === "Save") {
                  const colorSettings = JSON.stringify(settings);
                  window.localStorage.setItem("color-settings", colorSettings);
                  evt.target.textContent = "Saved!";
                  setTimeout(() => (evt.target.textContent = "Save"), 600);
                }
              }}
            >
              Save
            </button>
            <div style={{ backgroundColor: "#663399" }}></div>
            <div style={{ backgroundColor: "#663399" }}></div>
          </div>
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
