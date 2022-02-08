import "../css/custom-button.css"

const CustomButton = ({
  onClick,
  text,
  className,
  bgColor,
  style,
  buttonRef,
}) => {
  return (
    <div className={`button-container ${className}`} style={style}>
      <button type="button" onClick={onClick} ref={buttonRef}>
        {text}
      </button>
      <div style={{ backgroundColor: bgColor }}></div>
      <div style={{ backgroundColor: bgColor }}></div>
    </div>
  );
};

export default CustomButton;
