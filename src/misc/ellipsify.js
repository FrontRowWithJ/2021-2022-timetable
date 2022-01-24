//! ELIPSIFY A STRING

const getString = (string = "", idealWidth, dummyDiv) => {
  const THRESHOLD = 30;
  for (let i = 0; i <= string.length; i++) {
    dummyDiv.innerHTML = string.substring(0, i) + "...";
    if (idealWidth - dummyDiv.clientWidth <= THRESHOLD)
      return dummyDiv.innerHTML;
  }
  return dummyDiv.innerHTML;
};

const generateDiv = (fontSize, div = document.createElement("div")) => {
  div.style.fontSize = fontSize;
  const keys = ["position", "visibility", "height", "width", "whiteSpace"];
  const values = ["absolute", "hidden", "auto", "auto", "nowrap"];
  keys.forEach((key, i) => (div.style[key] = values[i]));
  return div;
};

export const ellipsify = (string = "", div = document.createElement("div")) => {
  const fontSize = window.getComputedStyle(div).getPropertyValue("font-size");
  const dummyDiv = generateDiv(fontSize);
  document.body.appendChild(dummyDiv);
  const { clientWidth: idealWidth } = div;
  const newString = getString(string, idealWidth, dummyDiv);
  document.body.removeChild(dummyDiv);
  return newString;
};