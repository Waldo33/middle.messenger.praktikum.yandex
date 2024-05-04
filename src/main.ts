import Handlebars from "handlebars";

const template = Handlebars.compile(`<div>{{text}}</div>`);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = template({ text: "Test" })
