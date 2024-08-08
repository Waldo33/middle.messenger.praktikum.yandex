import { Block } from '../../core';
import './button.scss';
import { ButtonProps } from './types';

export class Button extends Block {
  static componentName = 'Button';

  constructor({
    onClick, ...rest
  }: ButtonProps) {
    super({
      events: { click: onClick }, ...rest
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
    return `<Button class="button ${classes ? classes : ''}" type="${type}">${
      textBtn ? textBtn : ''
    }</Button>`;
  }
}
