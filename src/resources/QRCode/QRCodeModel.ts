import { genQR8bitByte, getLength, QR8bitByte, write } from "./QR8BitByte";
import { createBytes, genQRBitBuffer, put, putBit } from "./QRBitBuffer";
import { getRSBlocks } from "./QRRSBlock";
import {
  getLostPoint,
  getPatternPosition,
  getBCHTypeNumber,
  getBCHTypeInfo,
  getMask,
  getLengthInBits,
} from "./QRUtil";

export interface QRCodeModel {
  typeNumber: number;
  errorCorrectLevel: number;
  modules: (boolean | null)[][];
  moduleCount: number;
  dataList: QR8bitByte[];
  dataCache: number[] | null;
  PAD0: 0xec;
  PAD1: 0x11;
}

export const genQRCodeModel = (
  typeNumber: number,
  errorCorrectLevel: number
) => {
  return {
    typeNumber,
    errorCorrectLevel,
    modules: [],
    moduleCount: 0,
    dataCache: null,
    dataList: [],
    PAD0: 0xec,
    PAD1: 0x11,
  } as QRCodeModel;
};

export const addData = (QRCodeModel: QRCodeModel, data: string) => {
  const newData = genQR8bitByte(data);
  QRCodeModel.dataList.push(newData);
  QRCodeModel.dataCache = null;
};

export const isDark = (
  { moduleCount, modules }: QRCodeModel,
  row: number,
  col: number
) => {
  if (row < 0 || moduleCount <= row || col < 0 || moduleCount <= col)
    throw new Error(row + "," + col);
  return (modules as boolean[][])[row][col];
};

const makeImpl = (
  QRCodeModel: QRCodeModel,
  test: boolean,
  maskPattern: number
) => {
  QRCodeModel.moduleCount = QRCodeModel.typeNumber * 4 + 17;
  QRCodeModel.modules = new Array(QRCodeModel.moduleCount);
  for (let row = 0; row < QRCodeModel.moduleCount; row++) {
    QRCodeModel.modules[row] = new Array(QRCodeModel.moduleCount);
    for (let col = 0; col < QRCodeModel.moduleCount; col++)
      QRCodeModel.modules[row][col] = null;
  }
  setupPositionProbePattern(QRCodeModel, 0, 0);
  setupPositionProbePattern(QRCodeModel, QRCodeModel.moduleCount - 7, 0);
  setupPositionProbePattern(QRCodeModel, 0, QRCodeModel.moduleCount - 7);
  setupPositionAdjustPattern(QRCodeModel);
  setupTimingPattern(QRCodeModel);
  setupTypeInfo(QRCodeModel, test, maskPattern);
  if (QRCodeModel.typeNumber >= 7) setupTypeNumber(QRCodeModel, test);
  if (QRCodeModel.dataCache === null) {
    QRCodeModel.dataCache = createData(
      QRCodeModel,
      QRCodeModel.typeNumber,
      QRCodeModel.errorCorrectLevel,
      QRCodeModel.dataList
    );
  }
  mapData(QRCodeModel, QRCodeModel.dataCache, maskPattern);
};

export const make = (QRCodeModel: QRCodeModel) =>
  makeImpl(QRCodeModel, false, getBestMaskPattern(QRCodeModel));

const setupPositionProbePattern = (
  { moduleCount, modules }: QRCodeModel,
  row: number,
  col: number
) => {
  for (let r = -1; r <= 7; r++) {
    if (row + r <= -1 || moduleCount <= row + r) continue;
    for (let c = -1; c <= 7; c++) {
      if (col + c <= -1 || moduleCount <= col + c) continue;
      const b0 = 0 <= r && r <= 6 && (c === 0 || c === 6);
      const b1 = 0 <= c && c <= 6 && (r === 0 || r === 6);
      const b2 = 2 <= r && r <= 4 && 2 <= c && c <= 4;
      if (b0 || b1 || b2) (modules as boolean[][])[row + r][col + c] = true;
      else (modules as boolean[][])[row + r][col + c] = false;
    }
  }
};

const getBestMaskPattern = (QRCodeModel: QRCodeModel) => {
  let minLostPoint = 0;
  let pattern = 0;
  for (let i = 0; i < 8; i++) {
    makeImpl(QRCodeModel, true, i);
    let lostPoint = getLostPoint(QRCodeModel);
    if (i === 0 || minLostPoint > lostPoint) {
      minLostPoint = lostPoint;
      pattern = i;
    }
  }
  return pattern;
};

const setupTimingPattern = ({ moduleCount, modules }: QRCodeModel) => {
  for (let r = 8; r < moduleCount - 8; r++) {
    if (modules[r][6] !== null) continue;
    modules[r][6] = r % 2 === 0;
  }
  for (let c = 8; c < moduleCount - 8; c++) {
    if (modules[6][c] !== null) continue;
    modules[6][c] = c % 2 === 0;
  }
};

const setupPositionAdjustPattern = ({ typeNumber, modules }: QRCodeModel) => {
  let pos = getPatternPosition(typeNumber);
  for (let i = 0; i < pos.length; i++) {
    for (let j = 0; j < pos.length; j++) {
      let row = pos[i];
      let col = pos[j];
      if (modules[row][col] !== null) continue;
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const absR = Math.abs(r);
          const absC = Math.abs(c);
          if (absR === 2 || absC === 2 || (r === 0 && c === 0))
            modules[row + r][col + c] = true;
          else modules[row + r][col + c] = false;
        }
      }
    }
  }
};

const setupTypeNumber = (
  { moduleCount, modules, typeNumber }: QRCodeModel,
  test: boolean
) => {
  let bits = getBCHTypeNumber(typeNumber);
  for (let i = 0; i < 18; i++) {
    let mod = !test && ((bits >> i) & 1) === 1;
    modules[Math.floor(i / 3)][(i % 3) + moduleCount - 8 - 3] = mod;
  }
  for (let i = 0; i < 18; i++) {
    let mod = !test && ((bits >> i) & 1) === 1;
    modules[(i % 3) + moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
  }
};

const setupTypeInfo = ({ errorCorrectLevel, moduleCount, modules }: QRCodeModel, test: boolean, maskPattern: number) => {
  let data = (errorCorrectLevel << 3) | maskPattern;
  let bits = getBCHTypeInfo(data);
  for (let i = 0; i < 15; i++) {
    let mod = !test && ((bits >> i) & 1) === 1;
    if (i < 6) modules[i][8] = mod;
    else if (i < 8) modules[i + 1][8] = mod;
    else modules[moduleCount - 15 + i][8] = mod;
  }
  for (let i = 0; i < 15; i++) {
    let mod = !test && ((bits >> i) & 1) === 1;
    if (i < 8) modules[8][moduleCount - i - 1] = mod;
    else if (i < 9) modules[8][15 - i - 1 + 1] = mod;
    else modules[8][15 - i - 1] = mod;
  }
  modules[moduleCount - 8][8] = !test;
};

const mapData = (QRCodeModel: QRCodeModel, data: number[], maskPattern: number) => {
  let inc = -1;
  let row = QRCodeModel.moduleCount - 1;
  let bitIndex = 7;
  let byteIndex = 0;
  for (let col = QRCodeModel.moduleCount - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    while (true) {
      for (let c = 0; c < 2; c++) {
        if (QRCodeModel.modules[row][col - c] == null) {
          let dark = false;
          if (byteIndex < data.length)
            dark = ((data[byteIndex] >>> bitIndex) & 1) === 1;
          const mask = getMask(maskPattern, row, col - c);
          if (mask) dark = !dark;
          QRCodeModel.modules[row][col - c] = dark;
          bitIndex--;
          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || QRCodeModel.moduleCount <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
};

const createData = (QRCodeModel: QRCodeModel, typeNumber: number, errorCorrectLevel: number, dataList: QR8bitByte[]) => {
  let rsBlocks = getRSBlocks(typeNumber, errorCorrectLevel);
  let buffer = genQRBitBuffer();
  for (let i = 0; i < dataList.length; i++) {
    let data = dataList[i];
    put(buffer, data.mode, 4);
    put(buffer, getLength(data), getLengthInBits(data.mode, typeNumber));
    write(data, buffer);
  }
  let totalDataCount = 0;
  for (const block of rsBlocks) totalDataCount += block.dataCount;

  if (buffer.length > totalDataCount * 8) {
    throw new Error(
      `code length overflow. 
      (${buffer.length}>${totalDataCount * 8})`
    );
  }
  if (buffer.length + 4 <= totalDataCount * 8) put(buffer, 0, 4);
  while (buffer.length % 8 !== 0) putBit(buffer, false);
  while (true) {
    if (buffer.length >= totalDataCount * 8) break;
    put(buffer, QRCodeModel.PAD0, 8);
    if (buffer.length >= totalDataCount * 8) break;
    put(buffer, QRCodeModel.PAD1, 8);
  }
  return createBytes(buffer, rsBlocks);
};
