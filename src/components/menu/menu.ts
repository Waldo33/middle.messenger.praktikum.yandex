import { Block } from '../../core';
import './menu.scss';
import { MenuProps } from './types';
import { Popup } from '../../utils/classes';
import plus from '../../image/plus.svg';
import close from '../../image/close.svg';
import photo from '../../image/photo.svg';
import file from '../../image/file.svg';
import location from '../../image/location.svg';
import { chatService } from '../../services';
import { config } from '../../utils/constants';

export class Menu extends Block {
  static componentName = 'Menu';

  constructor({ ...rest }: MenuProps) {
    super({ ...rest });
  }

  protected getStateFromProps(props: MenuProps): void {
    this.state = {
      isUser: props.isUser,
      chatItemId: props.chatItemId,

      handleAddUserPopup: () => {
        new Popup(
          config.popupAddUserSelector,
          config.menuBtnAddUserSelector,
          config.isOpenPopupSelector,
          config
        ).handleOpenPopup();
      },
      handleDeleteUserPopup: () => {
        new Popup(
          config.popupDeleteUserSelector,
          config.menuBtnDeleteUserSelector,
          config.isOpenPopupSelector,
          config
        ).handleOpenPopup();
      },
      handleRemoveChat: () => {
        chatService.removeChatById({ chatId: this.state.chatItemId });
        Popup.handleClosePopup(config.isShowMenuSelecor);
      },
    };
  }

  protected render(): string {
    // language=hbs
    return `
      {{#if ${this.state.isUser}}}
        <nav class="menu menu__list_element_user">
          <ul class="menu__list">
            <li class="menu__item">
              {{{MenuButton
                text="Добавить пользователя"
                icon="${plus}"
                alt="Иконка плюса"
                classes="menu-button_add-user"
                type="button"
                onClick=handleAddUserPopup
              }}}
            </li>
            <li class="menu__item">
              {{{MenuButton
                text="Удалить пользователя"
                icon="${close}"
                alt="Иконка крестика"
                classes="menu-button_delete-user"
                type="button"
                onClick=handleDeleteUserPopup
              }}}
            </li>
            <li class="menu__item">
            {{{Button
              onClick=handleRemoveChat
              textBtn="Удалить чат"
              type="button"
              classes="button_el_remove-item"
            }}}
            </li>
          </ul>
        </nav>
      {{else}}
        <nav class="menu menu__list_element_file">
          <ul class="menu__list">
            <li class="menu__item">
              {{{MenuButton
                text="Фото или Видео"
                icon="${photo}"
                alt="Иконка плюса"
                classes="menu-button_add-photo"
                type="button"
              }}}
            </li>
            <li class="menu__item">
              {{{MenuButton
                text="Файл"
                icon="${file}"
                alt="Иконка крестика"
                classes="menu-button_add-file"
                type="button"
              }}}
            </li>
            <li class="menu__item">
              {{{MenuButton
                text="Локация"
                icon="${location}"
                alt="Иконка локации"
                classes="menu-button_add-location"
                type="button"
              }}}
            </li>
          </ul>
        </nav>
      {{/if}}
    `;
  }
}
