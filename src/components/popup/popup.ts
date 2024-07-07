import { Block } from '../../core';
import './popup.scss';
import { PopupProps } from './types';

export class Popup extends Block {
  static componentName = 'Popup';

  constructor({
    classesForm,
    classesPopup,
    helperText,
    isDefault,
    name,
    onBlur,
    onClick,
    onFocus,
    onInput,
    textBtn,
    title,
    inputFileName,
  }: PopupProps) {
    super({
      classesPopup,
      classesForm,
      name,
      title,
      isDefault,
      helperText,
      textBtn,
      inputFileName,
      onInput,
      onFocus,
      onBlur,
      onClick,
    });
  }

  protected getStateFromProps(props: PopupProps): void {
    this.state = {
      classesPopup: props.classesPopup,
      classesForm: props.classesForm,
      name: props.name,
      title: props.title,
      isDefault: props.isDefault,
      helperText: props.helperText,
      textBtn: props.textBtn,
      inputFileName: props.inputFileName,
      onClick: props.onClick,
      onInput: props.onInput,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
    };
  }

  protected render(): string {
    const {
      classesForm, classesPopup, helperText, isDefault, name, textBtn, title, inputFileName,
    } = this.state;
    // language=hbs
    return `
      <div class="popup ${classesPopup || ''}">
        <div class="popup__container">
          <h2 class="popup__title">${title}</h2>
          <form class="popup__form ${
  classesForm || ''
}" name="${name}" novalidate>
            ${
  isDefault
    ? `
                  {{{InputWrapper
                    onInput=onInput
                    onFocus=onFocus
                    onBlur=onBlur
                    type="text"
                    helperText="${helperText}"
                    minlength="5"
                    maxlength="20"
                    name="login"
                  }}}
                  {{{Button
                    onClick=onClick
                    textBtn="${textBtn}"
                    type="submit"
                  }}}
                  `
    : `
                  {{{InputFile
                    inputFileName="${inputFileName}"
                  }}}
                  {{{Button
                    textBtn="${textBtn}"
                    type="submit"
                  }}}
                  `
}
          </form>
        </div>
      </div>
    `;
  }
}
