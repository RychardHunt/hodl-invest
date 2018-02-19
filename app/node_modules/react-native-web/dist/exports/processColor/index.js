'use strict';

exports.__esModule = true;

var _normalizeCssColor = require('normalize-css-color');

var _normalizeCssColor2 = _interopRequireDefault(_normalizeCssColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processColor = function processColor(color) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (color === undefined || color === null || opacity === 1 && typeof color === 'string' && color.charAt(0) !== '#') {
    return color;
  }

  // convert number and hex
  var int32Color = (0, _normalizeCssColor2.default)(color);
  if (int32Color === null) {
    return undefined;
  }

  // convert 0xrrggbbaa into rgba
  var rgba = _normalizeCssColor2.default.rgba(int32Color);
  rgba.a = rgba.a.toFixed(1);
  var r = rgba.r,
      g = rgba.g,
      b = rgba.b,
      a = rgba.a;

  return 'rgba(' + r + ',' + g + ',' + b + ',' + a * opacity + ')';
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * Copyright (c) 2015-present, Facebook, Inc.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @providesModule processColor
    * 
    */

exports.default = processColor;