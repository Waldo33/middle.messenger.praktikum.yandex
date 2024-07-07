export interface PopupProps {
  classesForm?: string;
  classesPopup?: string;
  helperText?: Text;
  isDefault: boolean;
  name: string;
  onBlur?: () => void;
  onClick?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
  textBtn: string;
  title: string;
  inputFileName: string;
}
