import { Block } from '../../core';
import './message.scss';
import { MessageProps } from '../../types';
import { MONTH } from '../../utils/constants';
import { getDate } from '../../utils/functions/getDate';

interface MessageType {
  isFirstUniqMessage: boolean;
}

export class Message extends Block {
  static componentName = 'Message';

  constructor({ ...rest }: MessageProps & MessageType) {
    super({ ...rest });
  }

  protected getStateFromProps(props: MessageProps & MessageType): void {
    this.state = {
      owner: props.owner,
      content: props.content,
      time: props.time,
      isRead: props.isRead,
      isFirstUniqMessage: props.isFirstUniqMessage,
    };
  }

  protected render(): string {
    const { owner, content, time, srcImg, isRead, isFirstUniqMessage } = this.state;

    const date = getDate(time);

    const classesForTitle = `${
      !owner ? 'message_is-not-owner' : srcImg ? 'message_is-img' : ''
    }`;
    const classesForText = `${owner ? 'message__text_is-me' : 'message__text_is-friend'}`;
    const classesForTime = `${
      isRead ? 'message__time_is-read' : 'message__time_is-not-read'
    }`;
    // language=hbs
    return `
      <li class="message ${classesForTitle}">
        ${
          isFirstUniqMessage
            ? `<p class="chat__text-date">${date.day} ${MONTH[date.month]}</p>`
            : ''
        }
        <p class="message__text ${classesForText}">
          ${content}
          ${
            owner
              ? `<time class="message__time">${date.hour}:${date.minute}</time>`
              : `<time class="message__time ${classesForTime}">${date.hour}:${date.minute}</time>`
          }
        </p>
      </li>
    `;
  }
}
