/* eslint-disable no-undef */
import { JSDOM } from 'jsdom';
import { useFakeXMLHttpRequest } from 'sinon';

const jsdom = new JSDOM(
  '<!DOCTYPE html><html><body><div id="app"></div></body></html>',
  {
    url: 'http://localhost/', // Устанавливаем базовый URL
  },
);
global.window = jsdom.window;
global.document = jsdom.window.document;
global.history = jsdom.window.history;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = useFakeXMLHttpRequest();
