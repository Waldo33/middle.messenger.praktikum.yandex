import { BrowserRouter as router } from '../../core';
import { lOCALSTORAGE } from '../constants';

export function checkIsLoginIn() {
  if (!localStorage.getItem(lOCALSTORAGE.IS_SIGNIN)) {
    router.back();
  }
  console.log(123)
}
