import { gexp, glog } from "./QRMath";

interface QRPolynomial {
  num: number[];
}

export const genQRPolynomial = (num: number[], shift: number) => {
  if (num.length === undefined) throw new Error(num.length + "/" + shift);
  let offset = 0;
  while (offset < num.length && num[offset] === 0) offset++;
  const poly: QRPolynomial = { num: new Array(num.length - offset + shift) };
  for (let i = 0; i < num.length - offset; i++) poly.num[i] = num[i + offset];
  return poly;
};

export const multiply = (poly: QRPolynomial, e: QRPolynomial) => {
  let num = new Array(poly.num.length + e.num.length - 1);
  for (let i = 0; i < poly.num.length; i++)
    for (let j = 0; j < e.num.length; j++)
      num[i + j] ^= gexp(glog(poly.num[i]) + glog(e.num[j]));
  return genQRPolynomial(num, 0);
};

type modFunc = (poly: QRPolynomial, e: QRPolynomial) => QRPolynomial;
export const mod: modFunc = (poly: QRPolynomial, e: QRPolynomial) => {
  if (poly.num.length - e.num.length < 0) return poly;
  const ratio = glog(poly.num[0]) - glog(e.num[0]);
  const num = new Array(poly.num.length);
  for (let i = 0; i < poly.num.length; i++) num[i] = poly.num[i];
  for (let i = 0; i < e.num.length; i++) num[i] ^= gexp(glog(e.num[i]) + ratio);
  return mod(genQRPolynomial(num, 0), e);
};
