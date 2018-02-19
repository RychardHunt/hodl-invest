'use strict';

exports.__esModule = true;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensureComponentIsNative = function ensureComponentIsNative(component) {
  (0, _invariant2.default)(component && typeof component.setNativeProps === 'function', 'Touchable child must either be native or forward setNativeProps to a native component');
}; /**
    * Copyright (c) 2015-present, Nicolas Gallagher.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @providesModule ensureComponentIsNative
    * 
    */

exports.default = ensureComponentIsNative;