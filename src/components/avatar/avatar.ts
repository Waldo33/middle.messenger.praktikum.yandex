import { Block } from '../../core';
import './avatar.scss';
import { AvatarProps } from './types';

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
        src="${srcAvatar}"
        alt="Аватар пользователя ${userName}"
      />
    `;
  }
}
