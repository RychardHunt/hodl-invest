'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var PickerItemPropType = function PickerItemPropType(props, propName, componentName) {
  var prop = props[propName];
  var error = null;
  _react2.default.Children.forEach(prop, function (child) {
    if (child.type !== _2.default.Item) {
      error = new Error('`Picker` children must be of type `Picker.Item`.');
    }
  });
  return error;
};

exports.default = PickerItemPropType;