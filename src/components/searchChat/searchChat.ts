import { Block } from '../../core';
import './searchChat.scss';
import { SearchChatProps } from './types';
import search from '../../image/search.svg';

export class SearchChat extends Block {
  static componentName = 'SearchChat';

  constructor({ onSearchByChats }: SearchChatProps) {
    super({ onSearchByChats });
  }

  protected render(): string {
    // language=hbs
    return `
      <form class="search-chat page__search-chat">
        <label class="search-chat__label">
          {{{InputChat onInput=onSearchByChats}}}
          <img class="search-chat__img" src="${search}" alt="Поиск по чату" />
        </label>
      </form>
    `;
  }
}
