export interface InputProps {
  buttonText: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder: string;
  generateTimetable: () => void;
}
