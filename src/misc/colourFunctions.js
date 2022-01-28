import { times } from "./getWeekdayDates.js";

const getLuminosity = (color = "#000000") => {
  const [rL, gL, bL] = color
    .substring(1)
    .match(/.{1,2}/g)
    .map((str) => parseInt(str, 16))
    .map((hex) => {
      let c = hex / 255.0;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
};

export const getTextColor = (bgColor) =>
  getLuminosity(bgColor) > 0.179 ? "#000000" : "#FFFFFF";
export const activityColors = ["#2929A3", "#E8AA14", "#F5054F", "#693696"];
export const textColors = activityColors.map(getTextColor);

const hex2rgb = (hex = "") =>
  hex
    .substring(1)
    .match(/.{1,2}/g)
    .map((str) => parseInt(str, 16) / 255);

const { max, min } = Math;

// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
export const hsl2rgb = (h, s, l) => {
  const a = s * min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * max(min(k - 3, 9 - k, 1), -1);
  return (
    "#" +
    [0, 8, 4]
      .map((n) => ((f(n) * 255) | 0).toString(16).padStart(2, "0"))
      .join("")
  );
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
const rgb2hsl = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
};

export const colorLuminance = (hex, lum = 0) => {
  // convert to decimal and change luminosity
  return (
    "#" +
    times(3, (i) => {
      let c = parseInt(hex.substr(1 + i * 2, 2), 16);
      c = (Math.min(Math.max(0, c + c * lum), 255) | 0).toString(16);
      return c.padStart(2, "0");
    }).join("")
  );
};

export const posToColor = (x, y, width, height, hex) => {
  const s = x / width;
  const l = (1 - (x / width) * 0.5) * (1 - y / height);
  const [r, g, b] = hex2rgb(hex);
  const [h] = rgb2hsl(r, g, b);
  return hsl2rgb((h * 360) | 0, s, l);
};

export const defaultSettings = activityColors.map((color) => {
  const [r, g, b] = hex2rgb(color);
  const [h, s, l] = rgb2hsl(r, g, b);
  const bgColor = hsl2rgb((h * 360) | 0, 1, 0.5);
  return {
    pickerPos: { left: s, top: l },
    bgColor: bgColor,
    sliderPos: h,
    color: color,
  };
});
