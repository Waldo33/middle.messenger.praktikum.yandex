import { Block } from '../../core';
import './editAvatar.scss';
import { EditAvatarProps } from './types';
import avatar from '../../image/avatar.svg';

export class EditAvatar extends Block {
  static componentName = 'EditAvatar';
  constructor({ onClick }: EditAvatarProps) {
    super({ events: { click: onClick } });
  }
  protected render(): string {
    // language=hbs
    return `
      <div class="edit-avatar">
        <img class="edit-avatar__img" src="${avatar}" alt="Аватар по умолчанию" />
        <span class="edit-avatar__span">Поменять аватар</span>
      </div>
    `;
  }
}
