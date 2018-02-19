'use strict';

exports.__esModule = true;
exports.prefixInlineStyles = undefined;

var _createPrefixer = require('inline-style-prefixer/static/createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _static = require('./static');

var _static2 = _interopRequireDefault(_static);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var prefixAll = (0, _createPrefixer2.default)(_static2.default);

exports.default = prefixAll;
var prefixInlineStyles = exports.prefixInlineStyles = function prefixInlineStyles(style) {
  var prefixedStyles = prefixAll(style);

  // React@15 removed undocumented support for fallback values in
  // inline-styles. Revert array values to the standard CSS value
  Object.keys(prefixedStyles).forEach(function (prop) {
    var value = prefixedStyles[prop];
    if (Array.isArray(value)) {
      prefixedStyles[prop] = value[value.length - 1];
    }
  });

  return prefixedStyles;
};