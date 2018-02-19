'use strict';

exports.__esModule = true;

var _I18nManager = require('../I18nManager');

var _I18nManager2 = _interopRequireDefault(_I18nManager);

var _multiplyStyleLengthValue = require('../../modules/multiplyStyleLengthValue');

var _multiplyStyleLengthValue2 = _interopRequireDefault(_multiplyStyleLengthValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

var emptyObject = {};

/**
 * Map of property names to their BiDi equivalent.
 */
var PROPERTIES_TO_SWAP = {
  borderTopLeftRadius: 'borderTopRightRadius',
  borderTopRightRadius: 'borderTopLeftRadius',
  borderBottomLeftRadius: 'borderBottomRightRadius',
  borderBottomRightRadius: 'borderBottomLeftRadius',
  borderLeftColor: 'borderRightColor',
  borderLeftStyle: 'borderRightStyle',
  borderLeftWidth: 'borderRightWidth',
  borderRightColor: 'borderLeftColor',
  borderRightWidth: 'borderLeftWidth',
  borderRightStyle: 'borderLeftStyle',
  left: 'right',
  marginLeft: 'marginRight',
  marginRight: 'marginLeft',
  paddingLeft: 'paddingRight',
  paddingRight: 'paddingLeft',
  right: 'left'
};

var PROPERTIES_SWAP_LEFT_RIGHT = {
  clear: true,
  float: true,
  textAlign: true
};

/**
 * Invert the sign of a numeric-like value
 */
var additiveInverse = function additiveInverse(value) {
  return (0, _multiplyStyleLengthValue2.default)(value, -1);
};

/**
 * BiDi flip the given property.
 */
var flipProperty = function flipProperty(prop) {
  return PROPERTIES_TO_SWAP.hasOwnProperty(prop) ? PROPERTIES_TO_SWAP[prop] : prop;
};

var swapLeftRight = function swapLeftRight(value) {
  return value === 'left' ? 'right' : value === 'right' ? 'left' : value;
};

var i18nStyle = function i18nStyle(originalStyle) {
  if (!_I18nManager2.default.isRTL) {
    return originalStyle;
  }

  var style = originalStyle || emptyObject;
  var nextStyle = {};

  for (var prop in style) {
    if (!Object.prototype.hasOwnProperty.call(style, prop)) {
      continue;
    }

    var value = style[prop];

    if (PROPERTIES_TO_SWAP[prop]) {
      var newProp = flipProperty(prop);
      nextStyle[newProp] = value;
    } else if (PROPERTIES_SWAP_LEFT_RIGHT[prop]) {
      nextStyle[prop] = swapLeftRight(value);
    } else if (prop === 'textShadowOffset') {
      nextStyle[prop] = value;
      nextStyle[prop].width = additiveInverse(value.width);
    } else {
      nextStyle[prop] = style[prop];
    }
  }

  return nextStyle;
};

exports.default = i18nStyle;