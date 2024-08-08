import { BrowserRouter as router } from '../../core';
import { PATHNAMES } from '../constants';

export function checkOnCorrectUrl(pathname: string) {
  if (!Object.values(PATHNAMES).find((path) => path === pathname)) {
    router.go(PATHNAMES.PATH_NOT_FOUND);
  }
}
