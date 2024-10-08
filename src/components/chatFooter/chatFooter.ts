import { Block } from '../../core';
import './chatFooter.scss';
import { ChatFooterProps } from './types';
import attach_btn from '../../image/attach-btn.svg';
import send_btn from '../../image/send-btn.svg';

export class ChatFooter extends Block {
  static componentName = 'ChatFooter';

  constructor({ onClick, onSubmit }: ChatFooterProps) {
    super({ events: { submit: onSubmit, click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="chat-footer">
        <form class="chat-footer__form">
          <button class="chat-footer__btn-attach" type="button" aria-label="Прирепить файл">
            <img
              class="chat-footer__icon-attach"
              src="${attach_btn}"
              alt="Иконка прирепить файл"
            />
          </button>
          <input class="chat-footer__input" type="text" placeholder="Поиск" required name="message" />
          <button class="chat-footer__btn-send" type="submit" aria-label="Отправить сообщение">
            <img
              class="chat-footer__icon-send"
              src="${send_btn}"
              alt="Иконка отправить сообщение"
            />
          </button>
        </form>
      </div>
    `;
  }
}
