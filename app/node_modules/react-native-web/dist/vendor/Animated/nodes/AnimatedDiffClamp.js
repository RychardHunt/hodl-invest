/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedDiffClamp
 * 
 * @format
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedInterpolation = require('./AnimatedInterpolation');
var AnimatedNode = require('./AnimatedNode');
var AnimatedWithChildren = require('./AnimatedWithChildren');

var AnimatedDiffClamp = function (_AnimatedWithChildren) {
  _inherits(AnimatedDiffClamp, _AnimatedWithChildren);

  function AnimatedDiffClamp(a, min, max) {
    _classCallCheck(this, AnimatedDiffClamp);

    var _this = _possibleConstructorReturn(this, _AnimatedWithChildren.call(this));

    _this._a = a;
    _this._min = min;
    _this._max = max;
    _this._value = _this._lastValue = _this._a.__getValue();
    return _this;
  }

  AnimatedDiffClamp.prototype.__makeNative = function __makeNative() {
    this._a.__makeNative();
    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  AnimatedDiffClamp.prototype.interpolate = function interpolate(config) {
    return new AnimatedInterpolation(this, config);
  };

  AnimatedDiffClamp.prototype.__getValue = function __getValue() {
    var value = this._a.__getValue();
    var diff = value - this._lastValue;
    this._lastValue = value;
    this._value = Math.min(Math.max(this._value + diff, this._min), this._max);
    return this._value;
  };

  AnimatedDiffClamp.prototype.__attach = function __attach() {
    this._a.__addChild(this);
  };

  AnimatedDiffClamp.prototype.__detach = function __detach() {
    this._a.__removeChild(this);
    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  AnimatedDiffClamp.prototype.__getNativeConfig = function __getNativeConfig() {
    return {
      type: 'diffclamp',
      input: this._a.__getNativeTag(),
      min: this._min,
      max: this._max
    };
  };

  return AnimatedDiffClamp;
}(AnimatedWithChildren);

module.exports = AnimatedDiffClamp;