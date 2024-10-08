import { Block } from '../../core';
import './btnProfile.scss';
import { BtnProfileProps } from './types';

export class BtnProfile extends Block {
  static componentName = 'BtnProfile';

  constructor({ onClick, ...rest }: BtnProfileProps) {
    super({ events: { click: onClick }, ...rest });
  }

  protected getStateFromProps(props: BtnProfileProps): void {
    this.state = {
      text: props.text,
      classes: props.classes,
      type: props.type,
    };
  }

  protected render(): string {
    const { classes, type, text } = this.state;
    const button =
      type === 'link'
        ? `<button class="btn-profile__link ${classes ? classes : ''}">${text}</button>`
        : `<button class="btn-profile__btn ${classes ? classes : ''}">${text}</button>`;
    // language=hbs
    return `
      <li class="btn-profile">
        ${button}
      </li>
    `;
  }
}
