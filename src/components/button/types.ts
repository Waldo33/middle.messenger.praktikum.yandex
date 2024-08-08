import { ButtonType } from '../../types';

export interface ButtonProps {
  classes?: string;
  onClick: () => void;
  textBtn?: string;
  type: ButtonType;
}
