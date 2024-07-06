import { Block } from '../../core';
import './button.scss';
import { ButtonProps } from './types';

export class Button extends Block {
  static componentName = 'Button';

  constructor({
    classes, onClick, textBtn, type,
  }: ButtonProps) {
    super({
      textBtn, type, classes, events: { click: onClick },
    });
  }

  protected getStateFromProps(props: ButtonProps): void {
    this.state = {
      textBtn: props.textBtn,
      type: props.type,
      classes: props.classes,
    };
  }

  protected render(): string {
    const { classes, textBtn, type } = this.state;
    // language=hbs
    return `<Button class="button ${
      classes || ''
    }" type="${type}">${textBtn}</Button>`;
  }
}
