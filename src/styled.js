import { h } from '@cycle/dom';
import utils from 'styletron-utils';

import initStyletron from './init-styletron.js';

export default function styled (base, styles) {
  // base is an html tag string
  if (typeof base === 'string') {
    return createStyledElement(base, [styles]);
  }

  // base is another styled element
  if (typeof base === 'function' && base[TAG_NAME] && base[STYLES]) {
    return createStyledElement(base[TAG_NAME], base[STYLES].concat(styles));
  }
}

function resolveDataAndChildren (args) {
  let data = {};
  let children = [];

  if (args.length === 1) {
    const arg = args[0];

    if (Array.isArray(arg) || arg.sel || typeof arg === 'string') {
      // children, vdom, or text
      children = Array.isArray(arg) ? arg : [arg];
    } else {
      // props object
      data = arg;
    }
  } else if (args.length === 2) {
    data = args[0];
    children = Array.isArray(args[1]) ? args[1] : [args[1]];
  }

  return { data, children };
}

function createStyledElement (tagName, stylesArray) {
  const element = (...args) => {
    const { data, children } = resolveDataAndChildren(args);
    const resolvedStyles = resolveStylesArray(stylesArray, data);
    const className = utils.injectStylePrefixed(initStyletron(), resolvedStyles);
    const classFromAttrs = data.attrs && data.attrs.class ? data.attrs.class : '';

    if (!data.attrs) data.attrs = { class: className };
    else if (!data.attrs.class) data.attrs.class = className;
    else if (classFromAttrs) data.attrs.class += className;

    return h(tagName, data, children);
  };
  element[TAG_NAME] = tagName;
  element[STYLES] = stylesArray;
  return element;
}

function resolveStylesArray (stylesArray, data) {
  const resolvedStyles = {};

  stylesArray.forEach(style => {
    if (typeof style === 'object') return Object.assign(resolvedStyles, style);
    if (typeof style === 'function') return Object.assign(resolvedStyles, style(data));
  });

  return resolvedStyles;
}
