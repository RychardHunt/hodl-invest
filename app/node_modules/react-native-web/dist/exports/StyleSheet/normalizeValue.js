'use strict';

exports.__esModule = true;

var _unitlessNumbers = require('../../modules/unitlessNumbers');

var _unitlessNumbers2 = _interopRequireDefault(_unitlessNumbers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalizeValue = function normalizeValue(property, value) {
  if (!_unitlessNumbers2.default[property] && typeof value === 'number') {
    value = value + 'px';
  }
  return value;
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @noflow
    */

exports.default = normalizeValue;