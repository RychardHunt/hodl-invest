'use strict';

exports.__esModule = true;

var _dismissKeyboard = require('../../modules/dismissKeyboard');

var _dismissKeyboard2 = _interopRequireDefault(_dismissKeyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Keyboard = {
  addListener: function addListener() {
    return { remove: function remove() {} };
  },
  dismiss: function dismiss() {
    (0, _dismissKeyboard2.default)();
  },
  removeAllListeners: function removeAllListeners() {},
  removeListener: function removeListener() {}
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * Copyright (c) 2015-present, Facebook, Inc.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @providesModule Keyboard
    * 
    */

exports.default = Keyboard;