'use strict';

exports.__esModule = true;

var _isDisabled = require('./isDisabled');

var _isDisabled2 = _interopRequireDefault(_isDisabled);

var _propsToAriaRole = require('./propsToAriaRole');

var _propsToAriaRole2 = _interopRequireDefault(_propsToAriaRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var propsToTabIndex = function propsToTabIndex(props) {
  var role = (0, _propsToAriaRole2.default)(props);
  var focusable = !(0, _isDisabled2.default)(props) && props.importantForAccessibility !== 'no' && props.importantForAccessibility !== 'no-hide-descendants';

  // Assume that 'link' is focusable by default (uses <a>).
  // Assume that 'button' is not (uses <div role='button'>) but must be treated as such.
  if (role === 'link') {
    if (props.accessible === false || !focusable) {
      return '-1';
    }
  } else if (role === 'button') {
    if (props.accessible !== false && focusable) {
      return '0';
    }
  } else {
    if (props.accessible === true && focusable) {
      return '0';
    }
  }
};

exports.default = propsToTabIndex;