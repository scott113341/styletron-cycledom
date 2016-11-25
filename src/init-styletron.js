import Styletron from 'styletron-client';

import { STYLETRON_GLOBAL } from './constants.js';

export default function initStyletron (hydrationStylesheets) {
  if (window[STYLETRON_GLOBAL]) return window[STYLETRON_GLOBAL];

  let sheets = hydrationStylesheets;
  if (!sheets) {
    const sheet = document.createElement('style');
    document.head.appendChild(sheet);
    sheets = [sheet];
  }

  const styletron = new Styletron(sheets);
  window[STYLETRON_GLOBAL] = styletron;
  return styletron;
}
