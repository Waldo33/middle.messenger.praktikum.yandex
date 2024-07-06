import { Block } from '../../core';
import './inputWrapper.scss';
import { InputWrapperProps } from './types';

export class InputWrapper extends Block {
  static componentName = 'InputWrapper';

  constructor({
    classes,
    helperText,
    maxlength,
    minlength,
    name,
    onBlur,
    onFocus,
    onInput,
    type,
  }: InputWrapperProps) {
    super({
      name,
      type,
      helperText,
      minlength,
      maxlength,
      classes,
      onFocus,
      onBlur,
      events: { input: onInput },
    });
  }

  protected getStateFromProps(props: InputWrapperProps): void {
    this.state = {
      name: props.name,
      classes: props.classes,
      type: props.type,
      minlength: props.minlength,
      maxlength: props.maxlength,
      helperText: props.helperText,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
    };
  }

  protected render(): string {
    const {
      classes, helperText, maxlength, minlength, name, type,
    } = this.state;
    // language=hbs
    return `
      <fieldset class="input ${classes || ''}">
        <label class="input__label">
          {{{Input
            onInput=handleClearError
            onFocus=onFocus
            onBlur=onBlur
            type="${type}"
            minlength="${minlength}"
            maxlength="${maxlength}"
            name="${name}"
          }}}
          <span class="input__text">${helperText}</span>
        </label>
        <p class="input__helper-text"></p>
      </fieldset>
    `;
  }
}
