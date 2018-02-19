'use strict';

exports.__esModule = true;

var _StyleSheetPropType = require('../../modules/StyleSheetPropType');

var _StyleSheetPropType2 = _interopRequireDefault(_StyleSheetPropType);

var _TextStylePropTypes = require('./TextStylePropTypes');

var _TextStylePropTypes2 = _interopRequireDefault(_TextStylePropTypes);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextPropTypes = {
  accessibilityComponentType: _propTypes.string,
  accessibilityLabel: _propTypes.string,
  accessibilityLiveRegion: (0, _propTypes.oneOf)(['assertive', 'none', 'polite']),
  accessibilityRole: (0, _propTypes.oneOf)(['button', 'heading', 'label', 'link', 'listitem']),
  accessibilityTraits: (0, _propTypes.oneOfType)([_propTypes.array, _propTypes.string]),
  accessible: _propTypes.bool,
  children: _propTypes.any,
  importantForAccessibility: (0, _propTypes.oneOf)(['auto', 'no', 'no-hide-descendants', 'yes']),
  numberOfLines: _propTypes.number,
  onLayout: _propTypes.func,
  onPress: _propTypes.func,
  selectable: _propTypes.bool,
  style: (0, _StyleSheetPropType2.default)(_TextStylePropTypes2.default),
  testID: _propTypes.string
}; /**
    * Copyright (c) 2015-present, Nicolas Gallagher.
    * Copyright (c) 2015-present, Facebook, Inc.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @providesModule TextPropTypes
    * 
    */

exports.default = TextPropTypes;