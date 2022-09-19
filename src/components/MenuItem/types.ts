export interface MenuItemProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  onMouseDown?: () => void;
}
