'use strict';

exports.__esModule = true;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StyleSheetPropType
 * 
 */

function StyleSheetPropType(shape) {
  var createStrictShapeTypeChecker = require('../createStrictShapeTypeChecker').default;
  var StyleSheet = require('../../exports/StyleSheet').default;

  var shapePropType = createStrictShapeTypeChecker(shape);
  return function (props, propName, componentName, location) {
    var newProps = props;
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {};
      var flatStyle = StyleSheet.flatten(props[propName]);
      // Remove custom properties from check
      var nextStyle = Object.keys(flatStyle).reduce(function (acc, curr) {
        if (curr.indexOf('--') !== 0) {
          acc[curr] = flatStyle[curr];
        }
        return acc;
      }, {});
      newProps[propName] = nextStyle;
    }

    for (var _len = arguments.length, rest = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      rest[_key - 4] = arguments[_key];
    }

    return shapePropType.apply(undefined, [newProps, propName, componentName, location].concat(rest));
  };
}

exports.default = StyleSheetPropType;