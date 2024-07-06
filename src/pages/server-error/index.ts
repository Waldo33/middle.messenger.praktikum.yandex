import { Block } from '../../core';

export default class ServerErrorPage extends Block {
  render() {
    // language=hbs
    return `
      <div class="page">
        {{{Error
          title="404"
          subtitle="Не туда попали"
        }}}
      </div>
    `;
  }
}
