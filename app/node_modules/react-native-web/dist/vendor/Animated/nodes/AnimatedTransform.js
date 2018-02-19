/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedTransform
 * 
 * @format
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedNode = require('./AnimatedNode');
var AnimatedWithChildren = require('./AnimatedWithChildren');
var NativeAnimatedHelper = require('../NativeAnimatedHelper');

var AnimatedTransform = function (_AnimatedWithChildren) {
  _inherits(AnimatedTransform, _AnimatedWithChildren);

  function AnimatedTransform(transforms) {
    _classCallCheck(this, AnimatedTransform);

    var _this = _possibleConstructorReturn(this, _AnimatedWithChildren.call(this));

    _this._transforms = transforms;
    return _this;
  }

  AnimatedTransform.prototype.__makeNative = function __makeNative() {
    _AnimatedWithChildren.prototype.__makeNative.call(this);
    this._transforms.forEach(function (transform) {
      for (var key in transform) {
        var value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__makeNative();
        }
      }
    });
  };

  AnimatedTransform.prototype.__getValue = function __getValue() {
    return this._transforms.map(function (transform) {
      var result = {};
      for (var key in transform) {
        var value = transform[key];
        if (value instanceof AnimatedNode) {
          result[key] = value.__getValue();
        } else {
          result[key] = value;
        }
      }
      return result;
    });
  };

  AnimatedTransform.prototype.__getAnimatedValue = function __getAnimatedValue() {
    return this._transforms.map(function (transform) {
      var result = {};
      for (var key in transform) {
        var value = transform[key];
        if (value instanceof AnimatedNode) {
          result[key] = value.__getAnimatedValue();
        } else {
          // All transform components needed to recompose matrix
          result[key] = value;
        }
      }
      return result;
    });
  };

  AnimatedTransform.prototype.__attach = function __attach() {
    var _this2 = this;

    this._transforms.forEach(function (transform) {
      for (var key in transform) {
        var value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__addChild(_this2);
        }
      }
    });
  };

  AnimatedTransform.prototype.__detach = function __detach() {
    var _this3 = this;

    this._transforms.forEach(function (transform) {
      for (var key in transform) {
        var value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__removeChild(_this3);
        }
      }
    });
    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  AnimatedTransform.prototype.__getNativeConfig = function __getNativeConfig() {
    var transConfigs = [];

    this._transforms.forEach(function (transform) {
      for (var key in transform) {
        var value = transform[key];
        if (value instanceof AnimatedNode) {
          transConfigs.push({
            type: 'animated',
            property: key,
            nodeTag: value.__getNativeTag()
          });
        } else {
          transConfigs.push({
            type: 'static',
            property: key,
            value: value
          });
        }
      }
    });

    NativeAnimatedHelper.validateTransform(transConfigs);
    return {
      type: 'transform',
      transforms: transConfigs
    };
  };

  return AnimatedTransform;
}(AnimatedWithChildren);

module.exports = AnimatedTransform;