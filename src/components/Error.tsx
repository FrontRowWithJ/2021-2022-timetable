import "../css/error.css";

interface ErrorProps {
  errorMessage: string;
  errorRef: React.RefObject<HTMLDivElement>;
}
const Error = ({ errorMessage, errorRef }: ErrorProps) => (
  <div ref={errorRef} className="error-message">
    {errorMessage}
  </div>
);

export default Error;
