import { Block } from '../../core';
import '../../styles/auth.scss';
import { FormValidator } from '../../utils/classes/FormValidator';
import { config, AUTH_FORM } from '../../utils/constants';
import { handleSubmitForm, checkOnValueInput } from '../../utils/functions';

const signupFormValidator = new FormValidator(
  config,
  AUTH_FORM,
  config.inputSelector,
  config.btnSubmitFormSelector,
  config.inputHelperTextSelector,
  config.isShowHelperTextSelector,
);

export default class SignupPage extends Block {
  protected getStateFromProps() {
    this.state = {
      handleChangeInput: (evt: Event) => {
        checkOnValueInput(evt);
        signupFormValidator.clearError();
        signupFormValidator.toggleBtnState();
      },
      hendleSubmitForm: (evt: Event) => {
        evt.preventDefault();
        const isValidField = signupFormValidator.isValidFieldWithCustomRules();
        handleSubmitForm({
          stateForm: signupFormValidator.checkStateForm(),
          inputSelector: config.inputSelector,
          formSelector: AUTH_FORM,
          disableBtn: signupFormValidator.disableBtn,
          addErors: signupFormValidator.addErrorsForInput,
          isValidField,
        });
      },
      handleValidateInput: (evt: Event) => {
        signupFormValidator.handleFieldValidation(evt);
      },
    };
  }

  render() {
    // language=hbs
    return `
      <div class="page">
        <main class="page__form">
          <form class="auth" name="signup" novalidate>
            <h1 class="auth__title">Регистрация</h1>
            {{{InputWrapper
              onInput=handleChangeInput
              onFocus=handleValidateInput
              onBlur=handleValidateInput
              type="email"
              helperText="Почта"
              name="email"
            }}}
            {{{InputWrapper
              onInput=handleChangeInput
              onFocus=handleValidateInput
              onBlur=handleValidateInput
              type="text"
              helperText="Логин"
              minlength="3"
              maxlength="20"
              name="login"
            }}}
            {{{InputWrapper
              onInput=handleChangeInput
              onFocus=handleValidateInput
              onBlur=handleValidateInput
              type="text"
              helperText="Имя"
              minlength="1"
              maxlength="50"
              name="first_name"
            }}}
            {{{InputWrapper
              onInput=handleChangeInput
              onFocus=handleValidateInput
              onBlur=handleValidateInput
              type="text"
              helperText="Фамилия"
              minlength="1"
              maxlength="50"
              name="second_name"
            }}}
            {{{InputWrapper
              onInput=handleChangeInput
              onFocus=handleValidateInput
              onBlur=handleValidateInput
              type="tel"
              helperText="Телефон"
              minlength="10"
              maxlength="15"
              name="phone"
            }}}
            {{{InputWrapper
              onInput=handleChangeInput
              onFocus=handleValidateInput
              onBlur=handleValidateInput
              type="password"
              helperText="Пароль"
              minlength="8"
              maxlength="40"
              name="password"
            }}}
            {{{InputWrapper
              onInput=handleChangeInput
              onFocus=handleValidateInput
              onBlur=handleValidateInput
              type="password"
              helperText="Пароль (ещё раз)"
              minlength="8"
              maxlength="40"
              classes="input_is-auth"
              name="repeatPassword"
            }}}
            {{{Button
              onClick=hendleSubmitForm
              textBtn="Зарегистрироваться"
              type="submit"
              classes="button_is-auth"
            }}}
            <a class="auth__link" href="/">Войти</a>
          </form>
        </main>
      </div>
    `;
  }
}
