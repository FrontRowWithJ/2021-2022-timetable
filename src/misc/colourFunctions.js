export const hex2rgb = (hex = "") =>
  hex
    .substring(1)
    .match(/.{1,2}/g)
    .map((str) => parseInt(str, 16) / 255);

const getLuminosity = (r, g, b) => 0.299 * r + 0.587 * g + 0.115 * b;

const { max, min } = Math;

export const getTextColor = (r, g, b) =>
  getLuminosity(r, g, b) > 0.5 ? "#000000" : "#FFFFFF";

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

export const defaultSettings = [
  {
    hue: 0.6666666666666666,
    sat: 0.5980392156862745,
    lum: 0.39999999999999997,
    color: "#2929A3",
    txtColor: "#FFFFFF",
  },
  {
    hue: 0.11792452830188678,
    sat: 0.8412698412698412,
    lum: 0.49411764705882355,
    color: "#E8AA14",
    txtColor: "#000000",
  },
  {
    hue: 0.9486111111111111,
    sat: 0.96,
    lum: 0.4901960784313726,
    color: "#F5054F",
    txtColor: "#FFFFFF",
  },
  {
    hue: 0.7552083333333334,
    sat: 0.47058823529411764,
    lum: 0.4,
    color: "#693696",
    txtColor: "#FFFFFF",
  },
];
