import { InputType } from '../../types';

export interface InputProps {
  maxlength?: string;
  minlength?: string;
  name: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
  type: InputType;
}
