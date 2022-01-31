export const hex2rgb = (hex = "") =>
  hex
    .substring(1)
    .match(/.{1,2}/g)
    .map((str) => parseInt(str, 16) / 255);

const getLuminosity = (r, g, b) => {
  const [rl, gl, bl] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
};

const { max, min } = Math;
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
const rgb2hsl = (r = 0, g = 0, b = 0) => {
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

export const getTextColor = (r, g, b) =>
  getLuminosity(r, g, b) > 0.179 ? "#000000" : "#FFFFFF";

export const activityColors = ["#2929A3", "#E8AA14", "#F5054F", "#693696"];

export const textColors = activityColors.map((color) =>
  getTextColor(hex2rgb(color))
);

// input: h,s,l in [0,1] - output: r,g,b in [0,1]
export const hsl2rgb = (h = 0, s = 1, l = 0.5) => {
  h = (h * 360) | 0;
  const a = s * min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * max(min(k - 3, 9 - k, 1), -1);
  return (
    "#" +
    [0, 8, 4]
      .map((n) => ((f(n) * 255) | 0).toString(16).padStart(2, "0"))
      .join("")
  );
};

export const colorLuminance = (hex, lum = 0) => {
  const res = hex2rgb(hex).map((n) => {
    const c = Math.min(Math.max(0, n + n * lum), 1);
    return ((c * 255) | 0).toString(16).padStart(2, "0");
  });
  return "#" + res.join("");
};

export const defaultSettings = activityColors.map((color = "") => {
  const [r, g, b] = hex2rgb(color);
  const [hue, sat, lum] = rgb2hsl(r, g, b);
  const txtColor = getTextColor(color);
  return {
    hue,
    sat,
    lum,
    color,
    txtColor,
  };
});
