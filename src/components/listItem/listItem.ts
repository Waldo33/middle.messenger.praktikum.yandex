import { Block } from '../../core';
import './listItem.scss';
import { ListItemProps } from './types';
import { ChatType } from '../../types';
import { DAYS, DATA_ATTRIBUTE } from '../../utils/constants';
import { getDate } from '../../utils/functions/getDate';

export class ListItem extends Block {
  static componentName = 'ListItem';

  constructor({ onClick, ...rest }: ChatType & ListItemProps) {
    super({
      events: { click: onClick },
      ...rest,
    });
  }

  protected getStateFromProps(props: ChatType & ListItemProps): void {
    this.state = {
      id: props.id,
      userName: props.userName,
      lastMessage: props.lastMessage,
      time: props.time,
      countNotReadMessage: props.countNotReadMessage,
      srcAvatar: props.srcAvatar,
      isOwnerLastMessage: props.isOwnerLastMessage,
    };
  }

  protected render(): string {
    const {
      id,
      userName,
      lastMessage,
      time,
      countNotReadMessage,
      srcAvatar,
      isOwnerLastMessage,
    } = this.state;

    const date = getDate(time);

    const lastMessageText =
      isOwnerLastMessage === 'true'
        ? `<span class="list-item__message list-item__message_bold">Вы:</span>${lastMessage}`
        : lastMessage;

    // language=hbs
    return `
      <li class="list-item" ${DATA_ATTRIBUTE.CHAT_ID}="${id}">
        <div class="list-item__container">
          {{{Avatar srcAvatar="${srcAvatar}" userName="${userName}"}}}
          <div class="list-item__inner">
            <p class="list-item__user-name">${userName}</p>
            <p class="list-item__message">
              ${lastMessage !== 'null' ? lastMessageText : ''}
            </p>
          </div>
          <div class="list-item__wrap">
            <time class="list-item__time">${
              time !== 'null' ? DAYS[date.day - 1] : ''
            }</time>
            <p class="list-item__count-message {{#if ${countNotReadMessage}}}list-item__count-message_is-show{{/if}}">${countNotReadMessage}</p>
          </div>
        </div>
      </li>
    `;
  }
}
