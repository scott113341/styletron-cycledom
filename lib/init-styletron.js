'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initStyletron;

var _styletronClient = require('styletron-client');

var _styletronClient2 = _interopRequireDefault(_styletronClient);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initStyletron(hydrationStylesheets) {
  if (window[_constants.STYLETRON_GLOBAL]) return window[_constants.STYLETRON_GLOBAL];

  var sheets = hydrationStylesheets;
  if (!sheets) {
    var sheet = document.createElement('style');
    document.head.appendChild(sheet);
    sheets = [sheet];
  }

  var styletron = new _styletronClient2.default(sheets);
  window[_constants.STYLETRON_GLOBAL] = styletron;
  return styletron;
}
//# sourceMappingURL=init-styletron.js.map