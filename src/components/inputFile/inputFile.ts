import { Block } from '../../core';
import './inputFile.scss';

type InputFileProps = { inputFileName: string }

export class InputFile extends Block {
  static componentName = 'InputFile';

  // TODO: Добавить name
  constructor({ inputFileName }: InputFileProps) {
    super({
      inputFileName,
    })
  }

  protected getStateFromProps(props: InputFileProps): void {
    this.state = {
      inputFileName: props.inputFileName,
    };
  }

  protected render(): string {
    const { inputFileName } = this.state
    // language=hbs
    return `
      <label class="input-file">
        <input class="input-file__input" type="file" name="${inputFileName}" />
        <span class="input-file__span">Выбрать файл на компьютере</span>
      </label>
    `;
  }
}
