import { Block } from '../../core';
import './chatLink.scss';
import { ChatLinkProps } from './types';
import rightArrow from '../../image/right-arrow.svg';

export class ChatLink extends Block {
  static componentName = 'ChatLink';

  constructor({ onClick }: ChatLinkProps) {
    super({ events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
      <Button class="link-profile page__link-profile">
        <span class="link-profile__text">Профиль</span>
        <img class="link-profile__img" src="${rightArrow}" alt="Перейти к профилю пользователя">
      </Button>
    `;
  }
}
