import { Input } from "../classes/Input";
import { config } from "../constants";


export const checkOnValueInput = (evt: Event) => {
  evt.target && new Input(config, evt.target).checkOnValueInput();
};

console.log(123)
