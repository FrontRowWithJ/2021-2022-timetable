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

const useData = () => {
  const savedData = window.localStorage.getItem("color-data");
  const [data, set] = useState(
    savedData === null ? defaultSettings : JSON.parse(savedData)
  );

  const setData = (focus, obj) => {
    const newData = [...data];
    newData[focus] = obj;
    set(newData);
  };

  return [data, setData];
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
  const [data, setData] = useData();
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
    const obj = data[focus];
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
  }, [focus, data]);

  const pickerInterval = () => {
    const { x, y, right, bottom } =
      colorPickerRef.current.getBoundingClientRect();
    const { left, top } = getPos(mousePos.current, x, y);
    const [w, h] = [right - x, bottom - y];
    const _sat = left / w;
    const _lum = (1 - (left / w) * 0.5) * (1 - top / h);
    const color = hsl2rgb(hue, _sat, _lum);
    const txtColor = getTextColor(hex2rgb(color));
    setSat(_sat);
    setLum(_lum);
    setPos({ left: max(0, min(w, left)), top: max(0, min(h, top)) });
    setData(focus, { hue, sat: _sat, lum: _lum, color, txtColor });
  };

  const sliderInterval = () => {
    const { x, right } = colorSliderRef.current.getBoundingClientRect();
    const { left } = getPos(mousePos.current, x);
    const width = right - x;
    const trueLeft = max(0, min(width, left));
    const _hue = trueLeft / width;
    const color = hsl2rgb(_hue, sat, lum);
    const txtColor = getTextColor(hex2rgb(color));
    setBGColor(hsl2rgb(_hue));
    setHue(_hue);
    setSlider(trueLeft);  
    setData(focus, { hue: _hue, sat, lum, color, txtColor });
  };

  const getPos = ({ clientX, clientY }, x, y = 0) => {
    return { left: clientX - x, top: clientY - y };
  };
  return (
    <div className="customizer">
      <div className="preview">
        {ACTIVITIES.map((activity, i) => (
          <div
            key={activity}
            style={{
              color: data[i].txtColor,
              backgroundColor: data[i].color,
              opacity: i === focus ? 1 : 0.4,
            }}
            onClick={() => {
              setFocus(i);
            }}
          >
            {activity}
            <div
              className="bg-div"
              style={{ backgroundColor: data[i].color }}
            ></div>
            <div
              className="bg-div"
              style={{ backgroundColor: data[i].color }}
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
            const { x, y } = colorPickerRef.current.getBoundingClientRect();
            setPos(getPos(mousePos.current, x, y));
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
            const { x } = colorSliderRef.current.getBoundingClientRect();
            setSlider(getPos(mousePos.current, x).left);
            setSliderIID(setInterval(sliderInterval, 17));
          }}
        >
          <div
            className="slider-circle"
            style={{
              left: sliderPos,
              backgroundColor,
              boxShadow: `inset -5px -5px 10px ${colorLuminance(
                backgroundColor,
                -0.3
              )},
               inset 5px 5px 10px ${colorLuminance(backgroundColor, 0.3)}`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
