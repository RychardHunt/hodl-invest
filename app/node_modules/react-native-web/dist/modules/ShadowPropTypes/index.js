'use strict';

exports.__esModule = true;

var _ColorPropType = require('../../exports/ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var numberOrString = (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]);

var ShadowPropTypes = {
  shadowColor: _ColorPropType2.default,
  shadowOffset: (0, _propTypes.shape)({
    width: numberOrString,
    height: numberOrString
  }),
  shadowOpacity: _propTypes.number,
  shadowRadius: numberOrString,
  shadowSpread: numberOrString
};

exports.default = ShadowPropTypes;