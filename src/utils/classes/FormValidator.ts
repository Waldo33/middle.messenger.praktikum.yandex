import { FORM_ELEMENTS, MESSAGES, REGEXP_FOR_NAME_AND_LASTNAME, REGEXP_FOR_PHONE } from '../constants';
import { View } from './View';

export class FormValidator extends View {
  constructor(
    config: Record<string, string>,
    formSelector: string,
    inputSelector: string,
    btnSelector: string,
    inputHelperTextSelector: string,
    isShowHelperTextSelector: string
  ) {
    super();
    this._formSelector = formSelector;
    this._btnSelector = btnSelector;
    this._inputSelector = inputSelector;
    this._inputHelperTextSelector = inputHelperTextSelector;
    this._isShowHelperTextSelector = isShowHelperTextSelector;
    this._isDisableBtnSubmitSelector = config.isDisableBtnSubmitSelector;
    this._errorContainer = null;
    this._isValidFieldWithCustomRules = null;
  }

  private _closeErrorMessage() {
    if (this._errorContainer) {
      this._errorContainer.textContent = '';
      this._errorContainer.classList.remove(this._isShowHelperTextSelector);
    }
  }

  private _showErrorMessage(validationMessage: string) {
    if (this._errorContainer) {
      this._errorContainer.textContent = validationMessage;
      this._errorContainer.classList.add(this._isShowHelperTextSelector);
    }
  }

  private _getInputFromForm = () => {
    const form = document.querySelector(`.${this._formSelector}`) as HTMLFormElement;
    return form.querySelectorAll(`.${this._inputSelector}`);
  };

  private _checkExpressionByRegExp = (regexp: RegExp, value: string) => {
    return !regexp.test(value);
  };

  private _checkFieldByCustomRules = (element: EventTarget | null) => {
    const input = element as HTMLFormElement;
    if (
      input &&
      (input.name === FORM_ELEMENTS.USER_NAME_FIELD ||
        input.name === FORM_ELEMENTS.LAST_NAME_USER_FIELD)
    ) {
      const isValidValue = this._checkExpressionByRegExp(
        REGEXP_FOR_NAME_AND_LASTNAME,
        input.value
      );
      isValidValue && this._showErrorMessage(MESSAGES.CUSTOM_ERROR_FOR_NAME_AND_LASTNAME);
      this._isValidFieldWithCustomRules = {
        ...this._isValidFieldWithCustomRules,
        [input.name]: isValidValue,
      };
    }
    if (input && input.name === FORM_ELEMENTS.PHONE_USER_FIELD) {
      const isValidValue = this._checkExpressionByRegExp(REGEXP_FOR_PHONE, input.value);
      isValidValue && this._showErrorMessage(MESSAGES.CUSTOM_ERROR_FOR_PHONE_FILED);
      this._isValidFieldWithCustomRules = {
        ...this._isValidFieldWithCustomRules,
        [input.name]: isValidValue,
      };
    }
  };

  private _checkValidFieldsWithCustomRules = () => {
    if (this._isValidFieldWithCustomRules) {
      return Object.values(this._isValidFieldWithCustomRules).find(
        (element) => element === true
      );
    }
    return;
  };

  public handleFieldValidation(evt: Event) {
    const element = evt.target;

    this._errorContainer = (<Element>(
      element
    ))?.parentElement?.parentElement?.querySelector(`.${this._inputHelperTextSelector}`);

    !(<HTMLFormElement>element).validity.valid
      ? this._showErrorMessage((<HTMLFormElement>element).validationMessage)
      : this._closeErrorMessage();

    this._checkFieldByCustomRules(element);

    this._checkValidFieldsWithCustomRules() && this.disableBtn();
  }

  public clearError() {
    this._closeErrorMessage();
  }

  public checkStateForm() {
    const form = document.querySelector(`.${this._formSelector}`) as HTMLFormElement;
    return form.checkValidity();
  }

  public addErrorsForInput = () => {
    const inputs = this._getInputFromForm();
    inputs.forEach((input) => {
      const inputElement = input as HTMLFormElement;
      const element = input.parentElement?.parentElement?.querySelector(
        `.${this._inputHelperTextSelector}`
      );
      if (!inputElement.validity.valid) {
        if (element) {
          element.textContent = inputElement.validationMessage;
          element.classList?.add(this._isShowHelperTextSelector);
        }
      }
    });
  };

  public toggleBtnState = () => {
    const btn = document
      .querySelector(`.${this._formSelector}`)
      ?.querySelector(`.${this._btnSelector}`);
    if (btn) {
      this.checkStateForm()
        ? btn.classList.remove(this._isDisableBtnSubmitSelector)
        : btn.classList.add(this._isDisableBtnSubmitSelector);
    }
  };

  public disableBtn = () => {
    document
      .querySelector(`.${this._formSelector}`)
      ?.querySelector(`.${this._btnSelector}`)
      ?.classList.add(this._isDisableBtnSubmitSelector);
  };

  public isValidFieldWithCustomRules = () => this._checkValidFieldsWithCustomRules();
}
