import "../css/error.css";

const Error = ({ errorMessage, errorRef }) => (
  <div ref={errorRef} className="error-message">
    {errorMessage}
  </div>
);

export default Error;
