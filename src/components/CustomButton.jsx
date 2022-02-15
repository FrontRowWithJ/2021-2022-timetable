import "../css/custom-button.css";

const CustomButton = ({ onClick, text, className, buttonRef }) => {
  return (
    <div className={`c-button-container ${className}`}>
      <button type="button" onClick={onClick} ref={buttonRef}>
        {text}
      </button>
      <div></div>
      <div></div>
    </div>
  );
};

export default CustomButton;
