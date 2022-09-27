import { times } from "../../misc";
import { put, QRBitBuffer } from "./QRBitBuffer";
import { QRMode } from "./QRUtil";

export interface QR8bitByte {
  mode: number;
  data: string;
  parsedData: number[];
}

export const genQR8bitByte = (data: string) => {
  const QR8bitByte: QR8bitByte = {
    mode: QRMode.MODE_8BIT_BYTE,
    data,
    parsedData: [],
  };

  const parsedData = times(data.length, (i) => {
    const byteArray: number[] = [];
    const code = data.charCodeAt(i);
    if (code > 0x10000) {
      byteArray[0] = 0xf0 | ((code & 0x1c0000) >>> 18);
      byteArray[1] = 0x80 | ((code & 0x3f000) >>> 12);
      byteArray[2] = 0x80 | ((code & 0xfc0) >>> 6);
      byteArray[3] = 0x80 | (code & 0x3f);
    } else if (code > 0x800) {
      byteArray[0] = 0xe0 | ((code & 0xf000) >>> 12);
      byteArray[1] = 0x80 | ((code & 0xfc0) >>> 6);
      byteArray[2] = 0x80 | (code & 0x3f);
    } else if (code > 0x80) {
      byteArray[0] = 0xc0 | ((code & 0x7c0) >>> 6);
      byteArray[1] = 0x80 | (code & 0x3f);
    } else byteArray[0] = code;
    return byteArray;
  });
  QR8bitByte.parsedData = parsedData.flat();
  if (QR8bitByte.parsedData.length !== data.length) {
    QR8bitByte.parsedData.unshift(191);
    QR8bitByte.parsedData.unshift(187);
    QR8bitByte.parsedData.unshift(239);
  }
  return QR8bitByte;
};

export const getLength = ({ parsedData: { length } }: QR8bitByte) => length;

export const write = ({ parsedData }: QR8bitByte, buffer: QRBitBuffer) =>
  parsedData.forEach((pd) => put(buffer, pd, 8));
