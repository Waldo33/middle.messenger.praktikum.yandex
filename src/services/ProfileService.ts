import { profileApi } from '../api';
import { store } from '../core';
import { UserInfoDTO, UserPasswordType, SearchUserByLoginType, StoreEvents } from '../types';
import { MESSAGES } from '../utils/constants';
import { showError } from '../utils/functions/showError';
import { showTooltip } from '../utils/functions/tooltip';

class ProfileService {
  public changeAvatar(avatar: FormData) {
    profileApi
      .changeAvatar(avatar)
      .then(({ response }: any) => {
        store.setState({ userInfo: JSON.parse(response) });
        showTooltip({
          text: MESSAGES.SUCCESS_CHANGE_AVATAR_MESSAGE,
          type: 'success',
        });
      })
      .catch(showError);
  }
  public changeUserInfo(userInfo: UserInfoDTO) {
    profileApi
      .changeUserInfo(userInfo)
      .then(({ response }: any) => {
        store.setState({ userInfo: JSON.parse(response) });
        showTooltip({
          text: MESSAGES.SUCCESS_CHANGE_USER_INFO_MESSAGE,
          type: 'success',
        });
      })
      .catch(showError);
  }
  public changeUserPassword(userPassword: UserPasswordType) {
    profileApi
      .changeUserPassword(userPassword)
      .then(() =>
        showTooltip({
          text: MESSAGES.SUCCESS_CHANGE_USER_INFO_MESSAGE,
          type: 'success',
        })
      )
      .catch(showError);
  }

  public searchUserByLogin({ ...rest }: SearchUserByLoginType) {
    return profileApi
      .searchUserByLogin({ ...rest })
      .then(({ response }: any) =>
        store.setState({ users: response }, StoreEvents.ADD_USERS)
      )
      .catch(showError);
  }
}

export default new ProfileService();
