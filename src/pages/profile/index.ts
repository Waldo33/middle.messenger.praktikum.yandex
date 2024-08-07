import { Block } from '../../core';
import '../../styles/profile.scss';
import dataProfile from '../../data/profile.json';
import { Popup } from '../../utils/classes/Popup';
import { config } from '../../utils/constants';

const {
  chatName, email, lastName, login, name, phone,
} = dataProfile.payload;

export default class ProfilePage extends Block {
  protected getStateFromProps() {
    this.state = {
      handleEditAvatar: () => {
        new Popup(
          config.popupChangeAvatarSelector,
          config.editAvatarSelector,
          config.isOpenPopupSelecot,
          config,
        ).handleOpenPopup();
      },
    };
  }

  render() {
    // language=hbs
    return `
      <div class="profile">
        <ul class="profile__wrapper">
          {{{BtnBackProfile href="/chat"}}}
          <li class="profile__column">
            <form class="profile__form">
              {{{EditAvatar onClick=handleEditAvatar}}}
              <p class="profile__user-name">Иван</p>
              <ul class="profile__list">
                {{{InputProfileWrapper
                  type="email"
                  helperText="Почта"
                  value="${email}"
                }}}
                {{{InputProfileWrapper
                  type="text"
                  helperText="Логин"
                  value="${login}"
                }}}
                {{{InputProfileWrapper
                  type="text"
                  helperText="Имя"
                  value="${name}"
                }}}
                {{{InputProfileWrapper
                  type="text"
                  helperText="Фамилия"
                  value="${lastName}"
                }}}
                {{{InputProfileWrapper
                  type="text"
                  helperText="Имя в чате"
                  value="${chatName}"
                }}}
                {{{InputProfileWrapper
                  type="tel"
                  helperText="Телефон"
                  value="${phone}"
                }}}
              </ul>
              <ul class="profile__list">
                {{{BtnProfile
                  href="/edit-profile"
                  text="Изменить данные"
                  classes="btn-profile__link_color_red"
                }}}
                {{{BtnProfile
                  href="/edit-password"
                  text="Изменить пароль"
                  classes="btn-profile__link_color_red"
                }}}
                {{{BtnProfile
                  href="/"
                  text="Выйти"
                  classes="btn-profile__link_color_blue"
                }}}
              </ul>
            </form>
          </li>
        </ul>
        {{{Popup
          title="Загрузите файл"
          textBtn="Поменять"
          classesPopup="popup_change-avatar"
          isDefault=false
          inputFileName="avatar"
        }}}
      </div>
    `;
  }
}
