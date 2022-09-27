import { genQRCodeModel, addData, make } from "./QRCodeModel";
import { QRCodeLimitLength } from "./QRUtil";

const getTypeNumber = (sText: string, nCorrectLevel: number) => {
  let nType = 1;
  const list = [1, 0, 3, 2] as const;
  const length = getUTF8Length(sText);
  for (let i = 0; i <= QRCodeLimitLength.length; i++) {
    const nLimit = QRCodeLimitLength[i][list[nCorrectLevel]];
    if (length <= nLimit) break;
    else nType++;
  }
  if (nType > QRCodeLimitLength.length) throw new Error("Too long data");
  return nType;
};

const getUTF8Length = (sText: string) => {
  const replacedText = encodeURI(sText)
    .toString()
    .replace(/%[0-9a-fA-F]{2}/g, "a");
  return replacedText.length + (replacedText.length !== sText.length ? 3 : 0);
};

const makeCode = (sText: string, correctLevel: number) => {
  const cl = correctLevel;
  const qrCode = genQRCodeModel(getTypeNumber(sText, cl), cl);
  addData(qrCode, sText);
  make(qrCode);
  return qrCode;
};

export default makeCode;
