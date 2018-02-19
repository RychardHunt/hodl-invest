/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedStyle
 * @noflow
 * @format
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedNode = require('./AnimatedNode');
var AnimatedTransform = require('./AnimatedTransform');
var AnimatedWithChildren = require('./AnimatedWithChildren');
var NativeAnimatedHelper = require('../NativeAnimatedHelper');
var StyleSheet = require('../../../exports/StyleSheet').default;

var flattenStyle = StyleSheet.flatten;

var AnimatedStyle = function (_AnimatedWithChildren) {
  _inherits(AnimatedStyle, _AnimatedWithChildren);

  function AnimatedStyle(style) {
    _classCallCheck(this, AnimatedStyle);

    var _this = _possibleConstructorReturn(this, _AnimatedWithChildren.call(this));

    style = flattenStyle(style) || {};
    if (style.transform) {
      style = Object.assign({}, style, {
        transform: new AnimatedTransform(style.transform)
      });
    }
    _this._style = style;
    return _this;
  }

  // Recursively get values for nested styles (like iOS's shadowOffset)


  AnimatedStyle.prototype._walkStyleAndGetValues = function _walkStyleAndGetValues(style) {
    var updatedStyle = {};
    for (var key in style) {
      var value = style[key];
      if (value instanceof AnimatedNode) {
        if (!value.__isNative) {
          // We cannot use value of natively driven nodes this way as the value we have access from
          // JS may not be up to date.
          updatedStyle[key] = value.__getValue();
        }
      } else if (value && !Array.isArray(value) && typeof value === 'object') {
        // Support animating nested values (for example: shadowOffset.height)
        updatedStyle[key] = this._walkStyleAndGetValues(value);
      } else {
        updatedStyle[key] = value;
      }
    }
    return updatedStyle;
  };

  AnimatedStyle.prototype.__getValue = function __getValue() {
    return this._walkStyleAndGetValues(this._style);
  };

  // Recursively get animated values for nested styles (like iOS's shadowOffset)


  AnimatedStyle.prototype._walkStyleAndGetAnimatedValues = function _walkStyleAndGetAnimatedValues(style) {
    var updatedStyle = {};
    for (var key in style) {
      var value = style[key];
      if (value instanceof AnimatedNode) {
        updatedStyle[key] = value.__getAnimatedValue();
      } else if (value && !Array.isArray(value) && typeof value === 'object') {
        // Support animating nested values (for example: shadowOffset.height)
        updatedStyle[key] = this._walkStyleAndGetAnimatedValues(value);
      }
    }
    return updatedStyle;
  };

  AnimatedStyle.prototype.__getAnimatedValue = function __getAnimatedValue() {
    return this._walkStyleAndGetAnimatedValues(this._style);
  };

  AnimatedStyle.prototype.__attach = function __attach() {
    for (var key in this._style) {
      var value = this._style[key];
      if (value instanceof AnimatedNode) {
        value.__addChild(this);
      }
    }
  };

  AnimatedStyle.prototype.__detach = function __detach() {
    for (var key in this._style) {
      var value = this._style[key];
      if (value instanceof AnimatedNode) {
        value.__removeChild(this);
      }
    }
    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  AnimatedStyle.prototype.__makeNative = function __makeNative() {
    _AnimatedWithChildren.prototype.__makeNative.call(this);
    for (var key in this._style) {
      var value = this._style[key];
      if (value instanceof AnimatedNode) {
        value.__makeNative();
      }
    }
  };

  AnimatedStyle.prototype.__getNativeConfig = function __getNativeConfig() {
    var styleConfig = {};
    for (var styleKey in this._style) {
      if (this._style[styleKey] instanceof AnimatedNode) {
        styleConfig[styleKey] = this._style[styleKey].__getNativeTag();
      }
      // Non-animated styles are set using `setNativeProps`, no need
      // to pass those as a part of the node config
    }
    NativeAnimatedHelper.validateStyles(styleConfig);
    return {
      type: 'style',
      style: styleConfig
    };
  };

  return AnimatedStyle;
}(AnimatedWithChildren);

module.exports = AnimatedStyle;