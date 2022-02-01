import { useEffect, useRef, useState } from "react";
import "../css/color-picker.css";
import {
  ACTIVITIES,
  getTextColor,
  hsl2rgb,
  colorLuminance,
  defaultSettings,
  hex2rgb,
} from "../misc";
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
  return [settings, setSettings, set];
};

const ColorPicker = () => {
  const [focus, setFocus] = useState(0);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [backgroundColor, setBGColor] = useState("#FF0000");
  const [sliderPos, setSlider] = useState(0);
  const colorPickerRef = useRef(null);
  const colorSliderRef = useRef(null);
  const [pickerIID, setPickerIID] = useState(undefined);
  const [sliderIID, setSliderIID] = useState(undefined);
  const mousePos = useRef({ clientX: 0, clientY: 0 });
  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(0);
  const [lum, setLum] = useState(0);
  const [settings, setSettings, resetSettings] = useSettings();

  useEffect(() => {
    const onmousemove = ({ clientX, clientY }) =>
      (mousePos.current = { clientX, clientY });
    document.addEventListener("mousemove", onmousemove);
    const onmouseup = () => {
      clearInterval(pickerIID) || setPickerIID(undefined);
      clearInterval(sliderIID) || setSliderIID(undefined);
    };
    document.addEventListener("mouseup", onmouseup);
    return () => {
      document.removeEventListener("mousemove", onmousemove);
      document.removeEventListener("mouseup", onmouseup);
    };
  });

  useEffect(() => {
    const obj = settings[focus];
    const { x, y, right, bottom } =
      colorPickerRef.current.getBoundingClientRect();
    const [w, h] = [right - x, bottom - y];
    const { sat: _sat, lum: _lum, hue: _hue } = obj;
    const left = _sat * w;
    const top = h - (2 * w * h * _lum) / (2 * w - left);
    const { x: sliderX, right: sliderRight } =
      colorSliderRef.current.getBoundingClientRect();
    const width = sliderRight - sliderX;
    setPos({ left, top });
    setBGColor(hsl2rgb(_hue));
    setSlider(width * _hue);
    setHue(_hue);
    setSat(_sat);
    setLum(_lum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  const pickerInterval = () => {
    const { x, y, right, bottom } =
      colorPickerRef.current.getBoundingClientRect();
    const [w, h] = [right - x, bottom - y];
    const { left, top } = getPos(mousePos.current, x, y, w, h);
    const _sat = left / w;
    const _lum = (1 - (left / w) * 0.5) * (1 - top / h);
    const color = hsl2rgb(hue, _sat, _lum);
    const txtColor = getTextColor(...hex2rgb(color));
    setSat(_sat);
    setLum(_lum);
    setPos({ left, top });
    setSettings({ hue, sat: _sat, lum: _lum, color, txtColor }, focus);
  };

  const sliderInterval = () => {
    const { x, right } = colorSliderRef.current.getBoundingClientRect();
    const w = right - x;
    const { left } = getPos(mousePos.current, x, 0, w);
    const _hue = left / w;
    const color = hsl2rgb(_hue, sat, lum);
    const txtColor = getTextColor(...hex2rgb(color));
    setBGColor(hsl2rgb(_hue));
    setHue(_hue);
    setSlider(left);
    setSettings({ hue: _hue, sat, lum, color, txtColor }, focus);
  };

  const getPos = ({ clientX, clientY }, x, y = 0, w, h) => {
    return {
      left: max(0, min(clientX - x, w)),
      top: max(0, min(clientY - y, h)),
    };
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
        <div
          className="picker-area"
          ref={colorPickerRef}
          draggable="false"
          style={{ backgroundColor }}
          onMouseDown={() => {
            const { x, y, right, bottom } =
              colorPickerRef.current.getBoundingClientRect();
            const [w, h] = [right - x, bottom - y];
            setPos(getPos(mousePos.current, x, y, w, h));
            setPickerIID(setInterval(pickerInterval, 17));
          }}
        >
          <div className="picker-area-bg" draggable="false"></div>
          <div className="picker-area-bg" draggable="false"></div>
          <div className="picker-circle" draggable="false" style={pos}></div>
        </div>
        <div
          className="color-slider"
          ref={colorSliderRef}
          draggable="false"
          onMouseDown={() => {
            const { x, right } = colorSliderRef.current.getBoundingClientRect();
            setSlider(getPos(mousePos.current, x, 0, right - x).left);
            setSliderIID(setInterval(sliderInterval, 17));
          }}
        >
          <div
            className="slider-circle"
            style={{
              left: sliderPos,
              backgroundColor,
              boxShadow: `inset -5px -5px 10px 
              ${colorLuminance(backgroundColor, -0.3)},
               inset 5px 5px 10px ${colorLuminance(backgroundColor, 0.3)}`,
            }}
          ></div>
        </div>
        <button
          className="save-button"
          type="button"
          onClick={(evt) => {
            const { target: button } = evt;
            if (button.textContent === "Save") {
              const colorSettings = JSON.stringify(settings);
              window.localStorage.setItem("color-settings", colorSettings);
              // window.localStorage.removeItem("color-settings");
              evt.target.textContent = "Saved!";
              setTimeout(() => (evt.target.textContent = "Save"), 600);
            }
          }}
        >
          Save
        </button>
        <button
          className="set-to-default-button"
          onClick={() => {
            resetSettings(defaultSettings);
            window.localStorage.removeItem("color-settings");
            const obj = defaultSettings[focus];
            const { x, y, right, bottom } =
              colorPickerRef.current.getBoundingClientRect();
            const [w, h] = [right - x, bottom - y];
            const { sat: _sat, lum: _lum, hue: _hue } = obj;
            const left = _sat * w;
            const top = h - (2 * w * h * _lum) / (2 * w - left);
            const { x: sliderX, right: sliderRight } =
              colorSliderRef.current.getBoundingClientRect();
            const width = sliderRight - sliderX;
            setPos({ left, top });
            setBGColor(hsl2rgb(_hue));
            setSlider(width * _hue);
            setHue(_hue);
            setSat(_sat);
            setLum(_lum);
          }}
        >
          Set To Default
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
