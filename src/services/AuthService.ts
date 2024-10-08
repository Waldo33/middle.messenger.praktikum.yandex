import { authAPI } from '../api';
import { SignupType, SigninType } from '../types';
import { BrowserRouter as router, store } from '../core';
import { showTooltip } from '../utils/functions/tooltip';
import { lOCALSTORAGE, MESSAGES, PATHNAMES } from '../utils/constants';
import { getMessageFromResponse, showError } from '../utils/functions/showError';

class AuthService {
  public signup({ ...rest }: SignupType) {
    authAPI
      .signup({ ...rest })
      .then(() => {
        showTooltip({
          text: MESSAGES.SUCCESS_SIGNUP_MESSAGE,
          type: 'success',
        });
        localStorage.setItem(lOCALSTORAGE.IS_SIGNIN, 'true');
        router.go(PATHNAMES.MESSAGER_PATH);
      })
      .catch(showError);
  }

  public signin({ ...rest }: SigninType) {
    authAPI
      .signin({ ...rest })
      .then(() => {
        showTooltip({
          text: MESSAGES.SUCCESS_SIGNIN_MESSAGE,
          type: 'success',
        });
        localStorage.setItem(lOCALSTORAGE.IS_SIGNIN, 'true');
        router.go(PATHNAMES.MESSAGER_PATH);
      })
      .catch((err) => {
        const errorText = getMessageFromResponse(err.responseText)
        if (errorText === "User already in system") {
          router.go(PATHNAMES.MESSAGER_PATH);
        }
      });
  }

  public signout() {
    authAPI
      .signout()
      .then(() => {
        router.go(PATHNAMES.SIGNIN_PATH);
        localStorage.removeItem(lOCALSTORAGE.IS_SIGNIN);
      })
      .catch(showError);
  }

  public getInfo() {
    authAPI
      .getInfo()
      .then(({ response }: any) => {
        store.setState({ userInfo: JSON.parse(response) });
      })
      .catch(showError);
  }
}

export default new AuthService();
