import { Block, BrowserRouter as router } from '../../core';
import { lOCALSTORAGE, PATHNAMES } from '../../utils/constants';

export default class NotFoundPage extends Block {
  protected getStateFromProps() {
    this.state = {
      handleClickByLink: () => {
        localStorage.getItem(lOCALSTORAGE.IS_SIGNIN)
          ? router.go(PATHNAMES.MESSAGER_PATH)
          : router.go(PATHNAMES.SIGNIN_PATH);
      },
    };
  }

  render() {
    // language=hbs
    return `
      <div class="page">
        {{{Error
          onClick=handleClickByLink
          title="404"
          subtitle="Не туда попали"
        }}}
      </div>
    `;
  }
}
