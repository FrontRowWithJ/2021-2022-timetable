import "../css/cancel-button.css";

const CancelButton = ({ onClick }) => {
  return (
    <button type="button" className="cancel-button" onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default CancelButton;
