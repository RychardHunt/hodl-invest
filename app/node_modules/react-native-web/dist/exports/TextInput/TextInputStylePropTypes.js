'use strict';

exports.__esModule = true;

var _TextStylePropTypes = require('../Text/TextStylePropTypes');

var _TextStylePropTypes2 = _interopRequireDefault(_TextStylePropTypes);

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

var TextInputStylePropTypes = Object.assign({}, _TextStylePropTypes2.default, {
  /* @platform web */
  resize: (0, _propTypes.oneOf)(['none', 'vertical', 'horizontal', 'both'])
});

exports.default = TextInputStylePropTypes;