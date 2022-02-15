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
const TRANSITION_TIME = 500;
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
  const [sliderPos, setSliderPos] = useState(0);
  const pickerAreaRef = useRef(null);
  const sliderAreaRef = useRef(null);
  const sliderRef = useRef(null);
  const pickerRef = useRef(null);
  const [settings, setSettings, resetSettings] = useSettings();
  const mousemoves = useRef([]);
  const touchmoves = useRef([]);
  const hasPressed = useRef(false);
  const setPicker = (evt) => {
    const { x, y, right, bottom } =
      pickerAreaRef.current.getBoundingClientRect();
    const [w, h] = [right - x, bottom - y];
    const { clientX, clientY } = getEvent(evt);
    const { left, top } = getPos({ clientX, clientY }, x, y, w, h);
    const { hue } = settings[focus];
    const sat = left / w;
    const lum = (1 - (left / w) * 0.5) * (1 - top / h);
    const color = hsl2rgb(hue, sat, lum);
    const txtColor = getTextColor(...hex2rgb(color));
    setPos({ left: `${(left * 100) / w}%`, top: `${(top * 100) / h}%` });
    setSettings({ hue, sat, lum, color, txtColor }, focus);
    evt.preventDefault();
    evt.stopPropagation();
  };
  const setSlider = (evt) => {
    const { x, right } = sliderAreaRef.current.getBoundingClientRect();
    const { clientX, clientY } = getEvent(evt);
    const w = right - x;
    const { left } = getPos({ clientX, clientY }, x, 0, right - x);
    const hue = left / w;
    const { sat, lum } = settings[focus];
    const color = hsl2rgb(hue, sat, lum);
    const txtColor = getTextColor(...hex2rgb(color));
    setSliderPos(`${(left / w) * 100}%`);
    setSettings({ hue, sat, lum, color, txtColor }, focus);
    setBGColor(hsl2rgb(hue));
    evt.preventDefault();
    evt.stopPropagation();
  };

  const setColorPicker = (setting) => {
    const { sat, lum, hue } = setting;
    const { x, y, right, bottom } =
      pickerAreaRef.current.getBoundingClientRect();
    const [w, h] = [right - x, bottom - y];
    const left = sat * w;
    const top = h - (2 * w * h * lum) / (2 * w - left);
    const { x: sliderX, right: sliderRight } =
      sliderAreaRef.current.getBoundingClientRect();
    const width = sliderRight - sliderX;
    setPos({ left: `${(left * 100) / w}%`, top: `${(top * 100) / h}%` });
    setBGColor(hsl2rgb(hue));
    setSliderPos(`${(width * hue * 100) / w}%`);
  };

  useEffect(() => {
    const removeMouseEvents = () => {
      while (mousemoves.current.length)
        document.removeEventListener("mousemove", mousemoves.current.shift());
      hasPressed.current = false;
    };

    const removeTouchEvents = () => {
      while (touchmoves.current.length)
        document.removeEventListener("touchmove", touchmoves.current.shift());
      hasPressed.current = false;
    };
    document.addEventListener("mouseup", removeMouseEvents);
    document.addEventListener("touchend", removeTouchEvents);
    return () => {
      document.removeEventListener("mouseup", removeMouseEvents);
      document.removeEventListener("touchend", removeTouchEvents);
    };
  }, []);

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
    const { current: slider } = sliderRef;
    const { current: picker } = pickerRef;
    slider.style.transitionDuration =
      picker.style.transitionDuration = `${TRANSITION_TIME}ms`;
    setTimeout(() => {
      slider.style.transitionDuration = picker.style.transitionDuration = "";
    }, TRANSITION_TIME);
    target.textContent = "Defaulted!";
    setTimeout(() => (target.textContent = "Set to Default"), 600);
  };
  const handleEvent = (evt, cache, ref, func, type) => {
    const { current: target } = ref;
    target.style.transitionDuration = "";
    func(evt);
    if (!hasPressed.current) {
      cache.current.push(func);
      document.addEventListener(type, func);
      hasPressed.current = true;
    }
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
              const { current: slider } = sliderRef;
              const { current: picker } = pickerRef;
              slider.style.transitionDuration =
                picker.style.transitionDuration = `${TRANSITION_TIME}ms`;
              setTimeout(() => {
                slider.style.transitionDuration =
                  picker.style.transitionDuration = "";
              }, TRANSITION_TIME);
              setFocus(i);
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
            ref={pickerAreaRef}
            draggable="false"
            style={{ backgroundColor }}
            onMouseDown={(e) =>
              handleEvent(e, mousemoves, pickerRef, setPicker, "mousemove")
            }
            onTouchStart={(e) =>
              handleEvent(e, touchmoves, pickerRef, setPicker, "touchmove")
            }
          >
            <div className="picker-area-bg" draggable="false"></div>
            <div className="picker-area-bg" draggable="false"></div>

            <div
              className="picker-circle transition-circles"
              ref={pickerRef}
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
            ref={sliderAreaRef}
            draggable="false"
            onMouseDown={(e) =>
              handleEvent(e, mousemoves, sliderRef, setSlider, "mousemove")
            }
            onTouchStart={(e) =>
              handleEvent(e, touchmoves, sliderRef, setSlider, "touchmove")
            }
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
