import { Block } from '../../core';
import './menuButton.scss';
import { MenuButtonProps } from './types';

export class MenuButton extends Block {
  static componentName = 'MenuButton';

  constructor({ onClick, ...rest }: MenuButtonProps) {
    super({ events: { click: onClick }, ...rest });
  }

  protected getStateFromProps(props: MenuButtonProps): void {
    this.state = {
      text: props.text,
      icon: props.icon,
      alt: props.alt,
      classes: props.classes,
      type: props.type,
    };
  }

  protected render(): string {
    const { text, icon, alt, classes, type } = this.state;
    // language=hbs
    return `
      <button class="menu-button ${classes}" type="${type}">
        <img class="menu-button__icon" src="${icon}" alt="${alt}" />
        ${text}
      </button>
    `;
  }
}
