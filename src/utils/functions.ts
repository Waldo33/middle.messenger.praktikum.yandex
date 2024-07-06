import { Input } from './classes/Input';
import { Popup } from './classes/Popup';
import { config } from './constants';

interface SubmitFormProps {
  addErors: () => void;
  disableBtn: () => void;
  formSelector: string;
  inputSelector: string;
  isValidField?: boolean | undefined;
  stateForm: boolean;
}

export const handleSubmitForm = ({
  addErors,
  disableBtn,
  formSelector,
  inputSelector,
  isValidField = undefined,
  stateForm,
}: SubmitFormProps) => {
  if (stateForm && isValidField === undefined) {
    const form = document.querySelector(`.${formSelector}`);
    if (form) {
      const inputs = form.querySelectorAll(`.${inputSelector}`);
      let dataForm = {};

      inputs?.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        dataForm = { ...dataForm, [inputElement.name]: inputElement.value };
      });
      console.log(dataForm);

      Popup.handleClosePopup(config.isOpenPopupSelecot);
    }
  } else {
    disableBtn();
    addErors();
  }
};

export const checkOnValueInput = (event: Event) => {
  if (event.target) {
    return new Input(config, event.target).checkOnValueInput();
  }
};
