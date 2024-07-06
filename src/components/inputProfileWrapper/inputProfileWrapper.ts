import { Block } from '../../core';
import './inputProfileWrapper.scss';
import { InputProfileWrapperProps } from './types';

export class InputProfileWrapper extends Block {
  static componentName = 'InputProfileWrapper';

  constructor({
    formName,
    helperText,
    maxlength,
    minlength,
    name,
    onBlur,
    onFocus,
    onInput,
    type,
    value,
  }: InputProfileWrapperProps) {
    super({
      formName,
      name,
      minlength,
      maxlength,
      type,
      value,
      helperText,
      onInput,
      onFocus,
      onBlur,
    });
  }

  protected getStateFromProps(props: InputProfileWrapperProps): void {
    this.state = {
      formName: props.formName,
      name: props.name,
      minlength: props.minlength,
      maxlength: props.maxlength,
      type: props.type,
      value: props.value,
      helperText: props.helperText,
      onInput: props.onInput,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
    };
  }

  protected render(): string {
    const {
      helperText, maxlength, minlength, name, type, value,
    } = this.state;
    // language=hbs
    return `
      <li class="input-profile-wrapper">
        <label class="input-profile-wrapper__label">
          {{{InputProfile
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            type="${type}"
            value="${value}"
            name="${name}"
            minlength="${minlength}"
            maxlength="${maxlength}"
          }}}
          <span class="input-profile-wrapper__span">${helperText}</span>
          <span class="input-profile-wrapper__error"></span>
        </label>
      </li>
    `;
  }
}
