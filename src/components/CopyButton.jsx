import CopyLinkSVG from "./CopyLinkSVG";

const CopyButton = ({ id, url, ref }) => {
  return (
    <div
      id={id}
      onClick={() => {
        navigator.clipboard.writeText(url);
        const { current: div } = ref;
        const { textContent: original } = div;
        div.textContent = "Copied!";
        setTimeout(() => (div.textContent = original), 600);
      }}
    >
      <CopyLinkSVG fill={"white"} />
    </div>
  );
};

export default CopyButton;
