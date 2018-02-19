'use strict';

exports.__esModule = true;

var _dangerousStyleValue = require('../dangerousStyleValue');

var _dangerousStyleValue2 = _interopRequireDefault(_dangerousStyleValue);

var _warnValidStyle = require('../warnValidStyle');

var _warnValidStyle2 = _interopRequireDefault(_warnValidStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 * @param {ReactDOMComponent} component
 */
/* eslint-disable */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * From React 16.0.0
 */

var setValueForStyles = function setValueForStyles(node, styles, component) {
  var style = node.style;
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var isCustomProperty = styleName.indexOf('--') === 0;
    if (process.env.NODE_ENV !== 'production') {
      if (!isCustomProperty) {
        (0, _warnValidStyle2.default)(styleName, styles[styleName], component);
      }
    }
    var styleValue = (0, _dangerousStyleValue2.default)(styleName, styles[styleName], isCustomProperty);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    if (isCustomProperty) {
      style.setProperty(styleName, styleValue);
    } else if (styleValue) {
      style[styleName] = styleValue;
    } else {
      style[styleName] = '';
    }
  }
};

exports.default = setValueForStyles;