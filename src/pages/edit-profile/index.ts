import { Block } from '../../core';
import '../../styles/profile.scss';
import { Popup } from '../../utils/classes/Popup';
import { FormValidator } from '../../utils/classes/FormValidator';
import { config, EDIT_PROFILE_FORM } from '../../utils/constants';
import { handleSubmitForm } from '../../utils/functions';
import dataProfile from '../../data/profile.json';

const editProfileformValidator = new FormValidator(
  config,
  EDIT_PROFILE_FORM,
  config.inputProfileSelector,
  config.btnSubmitFormSelector,
  config.inputProfileHelperTextSelector,
  config.isShowInputProfileHelperTextSelector,
);

const {
  chatName, email, lastName, login, name, phone,
} = dataProfile.payload;

export default class EditProfilePage extends Block {
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
      handleChangeInput: () => {
        editProfileformValidator.clearError();
        editProfileformValidator.toggleBtnState();
      },
      hendleSubmitForm: (evt: Event) => {
        evt.preventDefault();
        const isValidField = editProfileformValidator.isValidFieldWithCustomRules();
        handleSubmitForm({
          stateForm: editProfileformValidator.checkStateForm(),
          inputSelector: config.inputProfileSelector,
          formSelector: EDIT_PROFILE_FORM,
          disableBtn: editProfileformValidator.disableBtn,
          addErors: editProfileformValidator.addErrorsForInput,
          isValidField,
        });
      },
      handleValidateInput: (evt: Event) => editProfileformValidator.handleFieldValidation(evt),
    };
  }

  render() {
    // language=hbs
    return `
      <div class="profile">
        <ul class="profile__wrapper">
          {{{BtnBackProfile href="/profile"}}}
          <li class="profile__column">
            <form
              class="profile__form profile__form_el_edit-form"
              novalidate
            >
              {{{EditAvatar onClick=handleEditAvatar}}}
              <p class="profile__user-name">Иван</p>
              <ul class="profile__list">
                {{{InputProfileWrapper
                  onInput=handleChangeInput
                  onFocus=handleValidateInput
                  onBlur=handleValidateInput
                  type="email"
                  helperText="Почта"
                  value="${email}"
                  name="email"
                  formName="profile__form_el_edit-form"
                }}}
                {{{InputProfileWrapper
                  onInput=handleChangeInput
                  onFocus=handleValidateInput
                  onBlur=handleValidateInput
                  type="text"
                  helperText="Логин"
                  value="${login}"
                  minlength="3"
                  maxlength="20"
                  name="login"
                  formName="profile__form_el_edit-form"
                }}}
                {{{InputProfileWrapper
                  onInput=handleChangeInput
                  onFocus=handleValidateInput
                  onBlur=handleValidateInput
                  type="text"
                  helperText="Имя"
                  value="${name}"
                  minlength="1"
                  maxlength="50"
                  name="first_name"
                  formName="profile__form_el_edit-form"
                }}}
                {{{InputProfileWrapper
                  onInput=handleChangeInput
                  onFocus=handleValidateInput
                  onBlur=handleValidateInput
                  type="text"
                  helperText="Фамилия"
                  value="${lastName}"
                  minlength="1"
                  maxlength="50"
                  name="second_name"
                  formName="profile__form_el_edit-form"
                }}}
                {{{InputProfileWrapper
                  onInput=handleChangeInput
                  onFocus=handleValidateInput
                  onBlur=handleValidateInput
                  type="tel"
                  helperText="Телефон"
                  value="${phone}"
                  minlength="10"
                  maxlength="15"
                  name="phone"
                  formName="profile__form_el_edit-form"
                }}}
                {{{InputProfileWrapper
                  onInput=handleChangeInput
                  onFocus=handleValidateInput
                  onBlur=handleValidateInput
                  type="text"
                  helperText="Имя в чате"
                  value="${chatName}"
                  minlength="1"
                  maxlength="50"
                  name="display_name"
                  formName="profile__form_el_edit-form"
                }}}
                {{{Button
                  onClick=hendleSubmitForm
                  textBtn="Сохранить"
                  classes="button_page_edit-profile"
                  type="submit"
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
