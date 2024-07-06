import { Block } from '../../core';
import './inputFile.scss';

export class InputFile extends Block {
  static componentName = 'InputFile';

  protected render(): string {
    // language=hbs
    return `
      <label class="input-file">
        <input class="input-file__input" type="file" />
        <span class="input-file__span">Выбрать файл на компьютере</span>
      </label>
    `;
  }
}
