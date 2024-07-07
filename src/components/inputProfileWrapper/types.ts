import { InputType } from '../../types';

export interface InputProfileWrapperProps {
  formName: string;
  helperText: string;
  maxlength: string;
  minlength: string;
  name: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
  type: InputType;
  value: string;
}
