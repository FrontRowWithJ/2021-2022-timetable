import { useEffect, useRef, useState } from "react";
import "../css/color-picker.css";
import {
  ACTIVITIES,
  textColors,
  activityColors,
  getTextColor,
  posToColor,
  hsl2rgb,
  colorLuminance,
  defaultSettings,
} from "../misc";
const { max, min } = Math;

const ColorPicker = (props) => {
  const [focus, setFocus] = useState(0);
  const [bgColors, setBgColors] = useState(activityColors);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [backgroundColor, setBGColor] = useState("#FF0000");
  const [sliderPos, setSlider] = useState(0);
  const colorPickerRef = useRef(null);
  const colorSliderRef = useRef(null);
  const [pickerIID, setPickerIID] = useState(undefined);
  const [sliderIID, setSliderIID] = useState(undefined);
  const mousePos = useRef({ clientX: 0, clientY: 0 });

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
    const obj = defaultSettings[focus];
    const { x, y, right, bottom } =
      colorPickerRef.current.getBoundingClientRect();
    const [w, h] = [right - x, bottom - y];
    const { left: s, top: l } = obj.pickerPos;
    const left = s * w;
    const top = h - (2 * w * h * l) / (2 * w - left);
    setPos({ left, top });
    setBGColor(obj.bgColor);
    const { x: sliderX, right: sliderRight } =
      colorSliderRef.current.getBoundingClientRect();
    const width = sliderRight - sliderX;
    setSlider(width * obj.sliderPos);
    //setColor(obj.color)
  }, [focus]);

  const pickerInterval = () => {
    const { x, y, right, bottom } =
      colorPickerRef.current.getBoundingClientRect();
    const { left, top } = getPos(mousePos.current, x, y);
    const [w, h] = [right - x, bottom - y];
    setPos({ left: max(0, min(w, left)), top: max(0, min(h, top)) });
    // setColor(posToColor(left, top, w, h, backgroundColor));
  };

  const sliderInterval = () => {
    const { x, right } = colorSliderRef.current.getBoundingClientRect();
    const { left } = getPos(mousePos.current, x);
    const width = right - x;
    const trueLeft = max(0, min(width, left));
    const h = (trueLeft / width) * 360;
    setBGColor(hsl2rgb(h, 1, 0.5));
    setSlider(trueLeft);
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
              color: textColors[i],
              backgroundColor: bgColors[i],
              opacity: i === focus ? 1 : 0.4,
            }}
            onClick={() => {
              setFocus(i);
            }}
          >
            {activity}
            <div
              className="bg-div"
              style={{ backgroundColor: bgColors[i] }}
            ></div>
            <div
              className="bg-div"
              style={{ backgroundColor: bgColors[i] }}
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
          <div className="circle" draggable="false" style={pos}></div>
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
