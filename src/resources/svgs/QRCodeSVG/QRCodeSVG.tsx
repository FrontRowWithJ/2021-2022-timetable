import { QRCodeSVGProps } from "./types";

const QRCodeSVG = ({ modules }: QRCodeSVGProps) => {
  const w = modules.length;
  const svgBody: JSX.Element[] = [];
  const [width, height, fill] = ["1", "1", "black"];

  for (let y = 0; y < modules.length; y++)
    for (let x = 0; x < modules.length; x++)
      if (modules[y][x]) {
        const key = `${x}_${y}`;
        svgBody.push(<rect {...{ width, height, x, y, fill, key }} />);
      }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${w} ${w}`}>
      <rect width="100%" height="100%" fill="white" />
      {svgBody}
    </svg>
  );
};

export default QRCodeSVG;
