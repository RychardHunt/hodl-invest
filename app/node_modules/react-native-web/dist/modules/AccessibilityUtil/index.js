'use strict';

exports.__esModule = true;

var _isDisabled = require('./isDisabled');

var _isDisabled2 = _interopRequireDefault(_isDisabled);

var _propsToAccessibilityComponent = require('./propsToAccessibilityComponent');

var _propsToAccessibilityComponent2 = _interopRequireDefault(_propsToAccessibilityComponent);

var _propsToAriaRole = require('./propsToAriaRole');

var _propsToAriaRole2 = _interopRequireDefault(_propsToAriaRole);

var _propsToTabIndex = require('./propsToTabIndex');

var _propsToTabIndex2 = _interopRequireDefault(_propsToTabIndex);

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

var AccessibilityUtil = {
  isDisabled: _isDisabled2.default,
  propsToAccessibilityComponent: _propsToAccessibilityComponent2.default,
  propsToAriaRole: _propsToAriaRole2.default,
  propsToTabIndex: _propsToTabIndex2.default
};

exports.default = AccessibilityUtil;