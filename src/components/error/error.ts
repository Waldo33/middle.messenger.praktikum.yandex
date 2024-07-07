import { Block } from '../../core';
import './error.scss';
import { ErrorProps } from './types';

export class Error extends Block {
  static componentName = 'Error';

  constructor({ subtitle, title }: ErrorProps) {
    super({ title, subtitle });
  }

  protected getStateFromProps(props: ErrorProps): void {
    this.state = {
      title: props.title,
      subtitle: props.subtitle,
    };
  }

  protected render(): string {
    const { subtitle, title } = this.state;
    // language=hbs
    return `
      <div class="error">
        <h1 class="error__title">${title}</h1>
        <p class="error__subtitle">${subtitle}</p>
        <a class="error__link" href="/">Назад к чатам</a>
      </div>
    `;
  }
}
