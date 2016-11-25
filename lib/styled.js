'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = styled;

var _dom = require('@cycle/dom');

var _styletronUtils = require('styletron-utils');

var _styletronUtils2 = _interopRequireDefault(_styletronUtils);

var _initStyletron = require('./init-styletron.js');

var _initStyletron2 = _interopRequireDefault(_initStyletron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function styled(base, styles) {
  // base is an html tag string
  if (typeof base === 'string') {
    return createStyledElement(base, [styles]);
  }

  // base is another styled element
  if (typeof base === 'function' && base[TAG_NAME] && base[STYLES]) {
    return createStyledElement(base[TAG_NAME], base[STYLES].concat(styles));
  }
}

function resolveDataAndChildren(args) {
  var data = {};
  var children = [];

  if (args.length === 1) {
    var arg = args[0];

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

  return { data: data, children: children };
}

function createStyledElement(tagName, stylesArray) {
  var element = function element() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _resolveDataAndChildr = resolveDataAndChildren(args),
        data = _resolveDataAndChildr.data,
        children = _resolveDataAndChildr.children;

    var resolvedStyles = resolveStylesArray(stylesArray, data);
    var className = _styletronUtils2.default.injectStylePrefixed((0, _initStyletron2.default)(), resolvedStyles);
    var classFromAttrs = data.attrs && data.attrs.class ? data.attrs.class : '';

    if (!data.attrs) data.attrs = { class: className };else if (!data.attrs.class) data.attrs.class = className;else if (classFromAttrs) data.attrs.class += className;

    return (0, _dom.h)(tagName, data, children);
  };
  element[TAG_NAME] = tagName;
  element[STYLES] = stylesArray;
  return element;
}

function resolveStylesArray(stylesArray, data) {
  var resolvedStyles = {};

  stylesArray.forEach(function (style) {
    if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === 'object') return Object.assign(resolvedStyles, style);
    if (typeof style === 'function') return Object.assign(resolvedStyles, style(data));
  });

  return resolvedStyles;
}
//# sourceMappingURL=styled.js.map