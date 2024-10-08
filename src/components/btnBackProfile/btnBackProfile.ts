import { Block } from '../../core';
import './btnBackProfile.scss';
import { BtnBackProfileProps } from './types';
import left_arrow from '../../image/left-arrow.svg';

export class BtnBackProfile extends Block {
  static componentName = 'BtnBackProfile';

  constructor({ onClick }: BtnBackProfileProps) {
    super({ events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
      <li class="profile-btn">
        <Button class="profile-btn__link" aria-label="Вернуться назад">
          <div class="profile-btn__wrap">
            <img
              class="profile__icon"
              src="${left_arrow}"
              alt="Иконка вернуться назад"
            />
          </div>
        </Button>
      </li>
    `;
  }
}
