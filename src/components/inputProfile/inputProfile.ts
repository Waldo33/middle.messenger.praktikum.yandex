import { Block } from '../../core';
import './inputProfile.scss';
import { InputProfileProps } from './types';

export class InputProfile extends Block {
  static componentName = 'InputProfile';

  constructor({
    maxlength,
    minlength,
    name,
    onBlur,
    onFocus,
    onInput,
    type,
    value,
  }: InputProfileProps) {
    super({
      name,
      minlength,
      maxlength,
      type,
      value,
      events: { input: onInput, focus: onFocus, blur: onBlur },
    });
  }

  protected getStateFromProps(props: InputProfileProps): void {
    this.state = {
      name: props.name,
      minlength: props.minlength,
      maxlength: props.maxlength,
      type: props.type,
      value: props.value,
    };
  }

  protected render(): string {
    const {
      maxlength, minlength, name, type, value,
    } = this.state;
    // language=hbs
    return `
      <input class="input-profile"
        type="${type}"
        value="${value}"
        name="${name}"
        minlength="${minlength}"
        maxlength="${maxlength}"
        required
      />
    `;
  }
}
