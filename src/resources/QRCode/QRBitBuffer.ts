import { genQRPolynomial, mod } from "./QRPolynomial";
import { QRRSBlock } from "./QRRSBlock";
import { getErrorCorrectPolynomial } from "./QRUtil";

export interface QRBitBuffer {
  buffer: number[];
  length: number;
}

export const genQRBitBuffer = () => ({ buffer: [], length: 0 } as QRBitBuffer);

export const createBytes = (buffer: QRBitBuffer, rsBlocks: QRRSBlock[]) => {
  let offset = 0;
  let maxDcCount = 0;
  let maxEcCount = 0;
  let dcdata = new Array(rsBlocks.length);
  let ecdata = new Array(rsBlocks.length);
  for (let r = 0; r < rsBlocks.length; r++) {
    const dcCount = rsBlocks[r].dataCount;
    const ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r] = new Array(dcCount);
    for (let i = 0; i < dcdata[r].length; i++)
      dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    offset += dcCount;
    const rsPoly = getErrorCorrectPolynomial(ecCount);
    const rawPoly = genQRPolynomial(dcdata[r], rsPoly.num.length - 1);
    const modPoly = mod(rawPoly, rsPoly);
    ecdata[r] = new Array(rsPoly.num.length - 1);
    for (let i = 0; i < ecdata[r].length; i++) {
      let modIndex = i + modPoly.num.length - ecdata[r].length;
      ecdata[r][i] = modIndex >= 0 ? modPoly.num[modIndex] : 0;
    }
  }
  const totalCodeCount = rsBlocks.reduce((p, curr) => p + curr.totalCount, 0);

  let data = new Array(totalCodeCount);
  let index = 0;
  for (let i = 0; i < maxDcCount; i++)
    for (let r = 0; r < rsBlocks.length; r++)
      if (i < dcdata[r].length) data[index++] = dcdata[r][i];

  for (let i = 0; i < maxEcCount; i++)
    for (let r = 0; r < rsBlocks.length; r++)
      if (i < ecdata[r].length) data[index++] = ecdata[r][i];

  return data;
};

export const put = (QRBitBuffer: QRBitBuffer, num: number, length: number) => {
  for (let i = 0; i < length; i++)
    putBit(QRBitBuffer, ((num >>> (length - i - 1)) & 1) === 1);
};

export const putBit = (buffer: QRBitBuffer, bit: boolean) => {
  const bufIndex = (buffer.length / 8) | 0;
  if (buffer.buffer.length <= bufIndex) buffer.buffer.push(0);
  if (bit) buffer.buffer[bufIndex] |= 0x80 >>> buffer.length++ % 8;
};
