'use strict';

exports.__esModule = true;

var _NativeMethodsMixin = require('../NativeMethodsMixin');

var _NativeMethodsMixin2 = _interopRequireDefault(_NativeMethodsMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyNativeMethods = function applyNativeMethods(Component) {
  Object.keys(_NativeMethodsMixin2.default).forEach(function (method) {
    if (!Component.prototype[method]) {
      Component.prototype[method] = _NativeMethodsMixin2.default[method];
    }
  });
  return Component;
}; /**
    * Copyright (c) 2015-present, Nicolas Gallagher.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @noflow
    */

exports.default = applyNativeMethods;