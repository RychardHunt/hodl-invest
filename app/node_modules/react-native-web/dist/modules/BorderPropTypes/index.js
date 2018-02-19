'use strict';

exports.__esModule = true;

var _ColorPropType = require('../../exports/ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _propTypes = require('prop-types');

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

var numberOrString = (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]);
var BorderStylePropType = (0, _propTypes.oneOf)(['solid', 'dotted', 'dashed']);

var BorderPropTypes = {
  borderColor: _ColorPropType2.default,
  borderTopColor: _ColorPropType2.default,
  borderRightColor: _ColorPropType2.default,
  borderBottomColor: _ColorPropType2.default,
  borderLeftColor: _ColorPropType2.default,
  borderRadius: numberOrString,
  borderTopLeftRadius: numberOrString,
  borderTopRightRadius: numberOrString,
  borderBottomLeftRadius: numberOrString,
  borderBottomRightRadius: numberOrString,
  borderStyle: BorderStylePropType,
  borderTopStyle: BorderStylePropType,
  borderRightStyle: BorderStylePropType,
  borderBottomStyle: BorderStylePropType,
  borderLeftStyle: BorderStylePropType
};

exports.default = BorderPropTypes;