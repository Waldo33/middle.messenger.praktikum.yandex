import { ButtonType } from '../../types';

export interface MenuButtonProps {
  alt: string;
  classes?: string;
  icon: string;
  onClick: () => void;
  text: string;
  type: ButtonType;
}
