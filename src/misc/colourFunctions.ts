export const hex2rgb = (hex: string) =>
  hex
    .substring(1)
    .match(/.{1,2}/g)
    ?.map((str) => parseInt(str, 16) / 255) as [number, number, number];

const getLuminosity = (r: number, g: number, b: number) =>
  0.299 * r + 0.587 * g + 0.115 * b;

export const getTextColor = (r: number, g: number, b: number) =>
  getLuminosity(r, g, b) > 0.5 ? "#000000" : "#FFFFFF";

// input: h,s,l in [0,1] - output: r,g,b in [0,1]
export const hsl2rgb = (h = 0, s = 1, l = 0.5) => {
  h = (h * 360) | 0;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return (
    "#" +
    [0, 8, 4]
      .map((n) => ((f(n) * 255) | 0).toString(16).padStart(2, "0"))
      .join("")
  );
};

export const colorLuminance = (hex: string, lum = 0) => {
  const res = hex2rgb(hex).map((n) => {
    const c = Math.min(Math.max(0, n + n * lum), 1);
    return ((c * 255) | 0).toString(16).padStart(2, "0");
  });
  return "#" + res.join("");
};

export interface ColorSettings {
  hue: number;
  sat: number;
  lum: number;
  backgroundColor: string;
  color: string;
}

export const defaultSettings: ColorSettings[] = [
  {
    hue: 0.6666666666666666,
    sat: 0.5980392156862745,
    lum: 0.39999999999999997,
    backgroundColor: "#2929A3",
    color: "#FFFFFF",
  },
  {
    hue: 0.11792452830188678,
    sat: 0.8412698412698412,
    lum: 0.49411764705882355,
    backgroundColor: "#E8AA14",
    color: "#000000",
  },
  {
    hue: 0.9486111111111111,
    sat: 0.96,
    lum: 0.4901960784313726,
    backgroundColor: "#F5054F",
    color: "#FFFFFF",
  },
  {
    hue: 0.7552083333333334,
    sat: 0.47058823529411764,
    lum: 0.4,
    backgroundColor: "#693696",
    color: "#FFFFFF",
  },
];
