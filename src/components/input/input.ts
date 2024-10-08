import { Block } from '../../core';
import './input.scss';
import { InputProps } from './types';

export class Input extends Block {
  static componentName = 'Input';

  constructor({ onInput, onFocus, onBlur, ...rest }: InputProps) {
    super({
      events: { input: onInput, focus: onFocus, blur: onBlur },
      ...rest,
    });
  }

  protected getStateFromProps(props: InputProps): void {
    this.state = {
      name: props.name,
      type: props.type,
      minlength: props.minlength,
      maxlength: props.maxlength,
    };
  }

  protected render(): string {
    const { name, type, minlength, maxlength } = this.state;
    // language=hbs
    return `
      <input
        class="input__text-field"
        type=${type}
        minlength=${minlength}
        maxlength=${maxlength}
        required
        name="${name}"
      />
    `;
  }
}
