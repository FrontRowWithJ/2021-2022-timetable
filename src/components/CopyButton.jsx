import CopyLinkSVG from "./svg/CopyLink";

const CopyButton = ({ url, urlRef }) => {
  return (
    <div
      className="text-box-button"
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
