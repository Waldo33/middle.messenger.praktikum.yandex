import { Block } from '../../core';
import './userItem.scss';
import { URLS, DATA_ATTRIBUTE } from '../../utils/constants';
import defaultIcon from '../../image/avatar.svg';

export interface UserItemProps {
  onClick: () => void;
  id: number;
  avatar: string;
  login: string;
  email: string;
  type: 'delete' | 'add';
  role: 'regular' | 'admin';
}

export class UserItem extends Block {
  static componentName = 'UserItem';

  constructor({ onClick, ...rest }: UserItemProps) {
    super({ events: { click: onClick }, ...rest });
  }

  protected getStateFromProps(props: UserItemProps): void {
    this.state = {
      id: props.id,
      avatar: props.avatar,
      login: props.login,
      email: props.email,
      type: props.type,
      role: props.role,
    };
  }

  protected render(): string {
    const { id, avatar, login, email, type, role } = this.state;

    // language=hbs
    return `
      <li class="user-item" ${DATA_ATTRIBUTE.USER_ID}="${id}">
        <img class="user-item__avatar" src="${
          avatar && avatar !== 'null' ? `${URLS.RESOURCES}${avatar}` : defaultIcon
        }" alt="Аватар">
        <div class="user-item__wrapper">
          <p class="user-item__text-login">${login}</p>
          <p class="user-item__text-email">${email}</p>
          ${role === 'admin' ? '<p class="user-item__role">Админ</p>' : ''}
        </div>
        <button class="user-item__btn" type="button">
          ${type === 'add' ? '+' : '-'}
        </button>
      </li>
    `;
  }
}
