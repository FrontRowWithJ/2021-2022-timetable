import CopyLinkSVG from "./svg/CopyLink";

const CopyButton = ({ id, url, urlRef }) => {
  return (
    <div
      id={id}
      onClick={() => {
        navigator.clipboard.writeText(url);
        const { current: div } = urlRef;
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
