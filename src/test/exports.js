import test from 'tape';

const _exports = require('../index.js');

import CONSTANTS from '../constants.js';
import initStyletron from '../init-styletron.js';
import styled from '../styled.js';

test('exports', t => {
  const expected = {
    default: styled,
    CONSTANTS,
    initStyletron,
    styled
  };
  t.deepEqual(_exports, expected);
  t.end();
});
