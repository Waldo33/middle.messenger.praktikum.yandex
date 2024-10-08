import { Block } from '../../core';
import './inputWrapper.scss';
import { InputWrapperProps } from './types';

export class InputWrapper extends Block {
  static componentName = 'InputWrapper';

  constructor({ onInput, ...rest }: InputWrapperProps) {
    super({
      events: { input: onInput },
      ...rest,
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
    const { name, classes, type, minlength, maxlength, helperText } = this.state;
    // language=hbs
    return `
      <fieldset class="input ${classes ? classes : ''}">
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
