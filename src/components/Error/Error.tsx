import "./error.css";
import { ErrorProps } from "./types";

const Error = ({ errorMessage, errorRef }: ErrorProps) => (
  <div ref={errorRef} className="error-message">
    {errorMessage}
  </div>
);

export default Error;
