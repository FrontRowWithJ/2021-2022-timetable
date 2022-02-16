import "../css/custom-button.css";

const CustomButton = ({ onClick, text, id, buttonRef }) => {
  return (
    <div className="c-button-container" id={id}>
      <button type="button" onClick={onClick} ref={buttonRef}>
        {text}
      </button>
      <div></div>
      <div></div>
    </div>
  );
};

export default CustomButton;
