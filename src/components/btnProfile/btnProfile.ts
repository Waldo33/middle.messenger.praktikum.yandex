import { Block } from '../../core';
import './btnProfile.scss';
import { BtnProfileProps } from './types';

export class BtnProfile extends Block {
  static componentName = 'BtnProfile';

  constructor({ classes, href, text }: BtnProfileProps) {
    super({ text, classes, href });
  }

  protected getStateFromProps(props: BtnProfileProps): void {
    this.state = {
      text: props.text,
      classes: props.classes,
      href: props.href,
    };
  }

  protected render(): string {
    const { classes, href, text } = this.state;
    // language=hbs
    return `
      <li class="btn-profile">
        <a class="btn-profile__link ${classes || ''}" href="${href}">
          ${text}
        </a>
      </li>
    `;
  }
}
