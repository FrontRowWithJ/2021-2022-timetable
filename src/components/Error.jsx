import { useEffect } from "react";
import "../css/error.css";

const Error = ({ errorMessage, errorRef }) => {
  useEffect(() => {
    
  }, [errorMessage]);
  return (
    <div ref={errorRef} className="error-message">
      {errorMessage}
    </div>
  );
};

export default Error;
