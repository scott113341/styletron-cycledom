'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _constants = require('../constants.js');

var _constants2 = _interopRequireDefault(_constants);

var _initStyletron = require('../init-styletron.js');

var _initStyletron2 = _interopRequireDefault(_initStyletron);

var _styled = require('../styled.js');

var _styled2 = _interopRequireDefault(_styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = require('../index.js');

(0, _tape2.default)('exports', function (t) {
  var expected = {
    default: _styled2.default,
    CONSTANTS: _constants2.default,
    initStyletron: _initStyletron2.default,
    styled: _styled2.default
  };
  t.deepEqual(_exports, expected);
  t.end();
});
//# sourceMappingURL=exports.js.map