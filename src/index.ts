import { registerComponent, BrowserRouter as router} from './core';
import { components } from './components';
import { PATHNAMES } from './utils/constants';
import { Screens } from './types';
import { getScreenComponent } from './utils/functions/screenList';

components.forEach((component) => {
  registerComponent(component);
});

document.addEventListener('DOMContentLoaded', () => {
  router
    .use(PATHNAMES.SIGNIN_PATH, getScreenComponent(Screens.Signin))
    .use(PATHNAMES.SIGNUP_PATH, getScreenComponent(Screens.Signup))
    .use(PATHNAMES.MESSAGER_PATH, getScreenComponent(Screens.Messenger))
    .use(PATHNAMES.SETTINGS_PATH, getScreenComponent(Screens.Profile))
    .use(PATHNAMES.EDIT_SETTINGS_PATH, getScreenComponent(Screens.EditProfle))
    .use(PATHNAMES.EDIT_PASSWORD_PATH, getScreenComponent(Screens.EditPassword))
    .use(PATHNAMES.PATH_NOT_FOUND, getScreenComponent(Screens.PathNotFound))
    .start();
});
