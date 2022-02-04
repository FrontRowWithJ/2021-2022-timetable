import "../css/cancel-button.css";

const CancelButton = ({ onclick }) => {
  return (
    <button type="button" className="cancel-button" onClick={onclick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default CancelButton;
