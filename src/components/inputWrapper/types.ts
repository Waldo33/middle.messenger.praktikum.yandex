import { InputType } from '../../types';

export interface InputWrapperProps {
  classes?: string;
  helperText: string;
  maxlength?: number;
  minlength?: number;
  name: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
  type: InputType;
}
