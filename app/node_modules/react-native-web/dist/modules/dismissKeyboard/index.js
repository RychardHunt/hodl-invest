'use strict';

exports.__esModule = true;

var _TextInputState = require('../TextInputState');

var _TextInputState2 = _interopRequireDefault(_TextInputState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dismissKeyboard = function dismissKeyboard() {
  _TextInputState2.default.blurTextInput(_TextInputState2.default.currentlyFocusedField());
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @providesModule dismissKeyboard
    * 
    */

exports.default = dismissKeyboard;