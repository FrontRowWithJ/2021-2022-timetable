import { QRErrorCorrectLevel, RS_BLOCK_TABLE } from "./QRUtil";

export interface QRRSBlock {
  totalCount: number;
  dataCount: number;
}

const genQRRSBlock = (totalCount: number, dataCount: number) =>
  ({
    totalCount,
    dataCount,
  } as QRRSBlock);

export const getRSBlocks = (typeNumber: number, errorCorrectLevel: number) => {
  let rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);
  if (rsBlock === undefined)
    throw new Error(
      "bad rs block @ typeNumber:" +
        typeNumber +
        "/errorCorrectLevel:" +
        errorCorrectLevel
    );
  let length = rsBlock.length / 3;
  let list = [];
  for (let i = 0; i < length; i++) {
    let count = rsBlock[i * 3 + 0];
    let totalCount = rsBlock[i * 3 + 1];
    let dataCount = rsBlock[i * 3 + 2];
    for (let j = 0; j < count; j++)
      list.push(genQRRSBlock(totalCount, dataCount));
  }
  return list;
};

const getRsBlockTable = (typeNumber: number, errorCorrectLevel: number) => {
  switch (errorCorrectLevel) {
    case QRErrorCorrectLevel.L:
      return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
    case QRErrorCorrectLevel.M:
      return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
    case QRErrorCorrectLevel.Q:
      return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
    case QRErrorCorrectLevel.H:
      return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
    default:
      return undefined;
  }
};
