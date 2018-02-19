'use strict';

exports.__esModule = true;

var _normalizeValue = require('./normalizeValue');

var _normalizeValue2 = _interopRequireDefault(_normalizeValue);

var _processColor = require('../processColor');

var _processColor2 = _interopRequireDefault(_processColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different. It
 * gives giving precedence to the more specific style property. For example,
 * the value of `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutally exclusive style declarations by expanding all of
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longfrom equivalents.
 *
 * @noflow
 */

var emptyObject = {};
var styleShortFormProperties = {
  borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  marginHorizontal: ['marginRight', 'marginLeft'],
  marginVertical: ['marginTop', 'marginBottom'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  paddingHorizontal: ['paddingRight', 'paddingLeft'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
  textDecorationLine: ['textDecoration'],
  writingDirection: ['direction']
};

var colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true
};

var borderWidthProps = {
  borderWidth: true,
  borderTopWidth: true,
  borderRightWidth: true,
  borderBottomWidth: true,
  borderLeftWidth: true
};

var monospaceFontStack = 'monospace, monospace';
var systemFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif';

var alphaSortProps = function alphaSortProps(propsArray) {
  return propsArray.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
};

var defaultOffset = { height: 0, width: 0 };

/**
 * Shadow
 */

// TODO: add inset and spread support
var resolveShadow = function resolveShadow(resolvedStyle, style) {
  var _ref = style.shadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;

  var offsetX = (0, _normalizeValue2.default)(null, width);
  var offsetY = (0, _normalizeValue2.default)(null, height);
  var blurRadius = (0, _normalizeValue2.default)(null, style.shadowRadius || 0);
  var color = (0, _processColor2.default)(style.shadowColor, style.shadowOpacity);

  if (color) {
    var boxShadow = offsetX + ' ' + offsetY + ' ' + blurRadius + ' ' + color;
    resolvedStyle.boxShadow = style.boxShadow ? style.boxShadow + ', ' + boxShadow : boxShadow;
  } else if (style.boxShadow) {
    resolvedStyle.boxShadow = style.boxShadow;
  }
};

/**
 * Text Shadow
 */

var resolveTextShadow = function resolveTextShadow(resolvedStyle, style) {
  var _ref2 = style.textShadowOffset || defaultOffset,
      height = _ref2.height,
      width = _ref2.width;

  var offsetX = (0, _normalizeValue2.default)(null, width);
  var offsetY = (0, _normalizeValue2.default)(null, height);
  var blurRadius = (0, _normalizeValue2.default)(null, style.textShadowRadius || 0);
  var color = (0, _processColor2.default)(style.textShadowColor);

  if (color) {
    resolvedStyle.textShadow = offsetX + ' ' + offsetY + ' ' + blurRadius + ' ' + color;
  }
};

/**
 * Transform
 */

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
var mapTransform = function mapTransform(transform) {
  var type = Object.keys(transform)[0];
  var value = (0, _normalizeValue2.default)(type, transform[type]);
  return type + '(' + value + ')';
};

// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
var convertTransformMatrix = function convertTransformMatrix(transformMatrix) {
  var matrix = transformMatrix.join(',');
  return 'matrix3d(' + matrix + ')';
};

var resolveTransform = function resolveTransform(resolvedStyle, style) {
  var transform = style.transform;
  if (Array.isArray(style.transform)) {
    transform = style.transform.map(mapTransform).join(' ');
  } else if (style.transformMatrix) {
    transform = convertTransformMatrix(style.transformMatrix);
  }
  resolvedStyle.transform = transform;
};

/**
 * Reducer
 */

var createReducer = function createReducer(style, styleProps) {
  var hasResolvedShadow = false;
  var hasResolvedTextShadow = false;

  return function (resolvedStyle, prop) {
    var value = (0, _normalizeValue2.default)(prop, style[prop]);

    // Make sure the default border width is explicitly set to '0' to avoid
    // falling back to any unwanted user-agent styles.
    if (borderWidthProps[prop]) {
      value = value == null ? (0, _normalizeValue2.default)(null, 0) : value;
    }

    // Normalize color values
    if (colorProps[prop]) {
      value = (0, _processColor2.default)(value);
    }

    // Ignore everything else with a null value
    if (value == null) {
      return resolvedStyle;
    }

    switch (prop) {
      // Ignore some React Native styles
      case 'aspectRatio':
      case 'elevation':
      case 'overlayColor':
      case 'resizeMode':
      case 'tintColor':
        {
          break;
        }

      case 'display':
        {
          resolvedStyle.display = value;
          // A flex container in React Native has these defaults which should be
          // set only if there is no otherwise supplied flex style.
          if (style.display === 'flex' && style.flex == null) {
            if (style.flexShrink == null) {
              resolvedStyle.flexShrink = '0 !important';
            }
            if (style.flexBasis == null) {
              resolvedStyle.flexBasis = 'auto !important';
            }
          }
          break;
        }

      // The 'flex' property value in React Native must be a positive integer,
      // 0, or -1.
      //
      // On the web, a positive integer value for 'flex' is complicated by
      // browser differences. Although browsers render styles like 'flex:2'
      // consistently, they don't all set the same value for the resulting
      // 'flexBasis' (See #616). Expanding 'flex' in 'StyleSheet' would mean
      // setting different values for different browsers.
      //
      // This fix instead relies on the browser expanding 'flex' itself. And
      // because the 'flex' style is not being expanded the generated CSS is
      // likely to contain source order "conflicts". To avoid the browser
      // relying on source order to resolve the styles, all the longhand flex
      // property values must use '!important'.
      case 'flex':
        {
          if (value > 0) {
            resolvedStyle.flex = value;
            resolvedStyle.flexGrow = value + ' !important';
            resolvedStyle.flexShrink = '1 !important';
          } else if (value === 0) {
            resolvedStyle.flexGrow = '0 !important';
            resolvedStyle.flexShrink = '0 !important';
            resolvedStyle.flexBasis = 'auto !important';
          } else if (value === -1) {
            resolvedStyle.flexGrow = '0 !important';
            resolvedStyle.flexShrink = '1 !important';
            resolvedStyle.flexBasis = 'auto !important';
          }
          break;
        }

      case 'flexGrow':
      case 'flexShrink':
      case 'flexBasis':
        {
          if (value != null) {
            var hasImportant = ('' + value).indexOf('!important') > -1;
            resolvedStyle[prop] = hasImportant ? value : value + ' !important';
          }
          break;
        }

      case 'fontFamily':
        {
          if (value === 'System') {
            resolvedStyle.fontFamily = systemFontStack;
          } else if (value === 'monospace') {
            resolvedStyle.fontFamily = monospaceFontStack;
          } else {
            resolvedStyle.fontFamily = value;
          }
          break;
        }

      case 'shadowColor':
      case 'shadowOffset':
      case 'shadowOpacity':
      case 'shadowRadius':
        {
          if (!hasResolvedShadow) {
            resolveShadow(resolvedStyle, style);
          }
          hasResolvedShadow = true;
          break;
        }

      case 'textAlignVertical':
        {
          resolvedStyle.verticalAlign = value === 'center' ? 'middle' : value;
          break;
        }

      case 'textShadowColor':
      case 'textShadowOffset':
      case 'textShadowRadius':
        {
          if (!hasResolvedTextShadow) {
            resolveTextShadow(resolvedStyle, style);
          }
          hasResolvedTextShadow = true;
          break;
        }

      case 'transform':
      case 'transformMatrix':
        {
          resolveTransform(resolvedStyle, style);
          break;
        }

      default:
        {
          var longFormProperties = styleShortFormProperties[prop];
          if (longFormProperties) {
            longFormProperties.forEach(function (longForm, i) {
              // The value of any longform property in the original styles takes
              // precedence over the shortform's value.
              if (styleProps.indexOf(longForm) === -1) {
                resolvedStyle[longForm] = value;
              }
            });
          } else {
            resolvedStyle[prop] = value;
          }
        }
    }

    return resolvedStyle;
  };
};

var createReactDOMStyle = function createReactDOMStyle(style) {
  if (!style) {
    return emptyObject;
  }
  var styleProps = Object.keys(style);
  var sortedStyleProps = alphaSortProps(styleProps);
  var reducer = createReducer(style, styleProps);
  var resolvedStyle = sortedStyleProps.reduce(reducer, {});
  return resolvedStyle;
};

exports.default = createReactDOMStyle;