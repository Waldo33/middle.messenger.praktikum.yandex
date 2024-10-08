import { Block } from '../../core';
import './searchChat.scss';
import { SearchChatProps } from './types';
import search from '../../image/search.svg';
import { config } from '../../utils/constants';
import { Popup } from '../../utils/classes';

export class SearchChat extends Block {
  static componentName = 'SearchChat';

  constructor({ ...rest }: SearchChatProps) {
    super({ ...rest });
  }

  protected getStateFromProps() {
    this.state = {
      handleSubmitForm: (evt: Event) => {
        evt.preventDefault();
        evt.stopPropagation()
        new Popup(
          config.popupAddChatSelector,
          config.addChatBtnSelector,
          config.isOpenPopupSelector,
          config
        ).handleOpenPopup();
      },
    };
  }

  protected render(): string {
    // language=hbs
    return `
      <form class="search-chat page__search-chat">
        <label class="search-chat__label">
          {{{InputChat onInput=onSearchByChats}}}
          <img class="search-chat__img" src="${search}" alt="Поиск по чату" />
        </label>
        {{{Button
          onClick=handleSubmitForm
          type="button"
          classes="search-chat__btn"
        }}}
      </form>
    `;
  }
}
