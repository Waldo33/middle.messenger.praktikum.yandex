import { Block } from '../../core';
import { URLS } from '../../utils/constants';
import './avatar.scss';
import { AvatarProps } from './types';
import defaultIcon from '../../image/avatar.svg';

export class Avatar extends Block {
  static componentName = 'Avatar';

  constructor({ srcAvatar, userName }: AvatarProps) {
    super({ srcAvatar, userName });
  }

  protected getStateFromProps(props: AvatarProps): void {
    this.state = {
      userName: props.userName,
      srcAvatar: props.srcAvatar,
    };
  }

  protected render(): string {
    const { srcAvatar, userName } = this.state;
    // language=hbs
    return `
      <img
        class="avatar"
        src="${srcAvatar ? `${URLS.RESOURCES}${srcAvatar}` : defaultIcon}"
        alt="Аватар пользователя ${userName}"
      />
    `;
  }
}
