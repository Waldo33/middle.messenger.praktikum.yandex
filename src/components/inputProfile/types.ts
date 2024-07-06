import { InputType } from '../../types';

export interface InputProfileProps {
  maxlength?: string;
  minlength?: string;
  name: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
  type: InputType;
  value: string;
}
