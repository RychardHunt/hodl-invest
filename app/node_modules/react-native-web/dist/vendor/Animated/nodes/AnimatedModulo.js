/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedModulo
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

var AnimatedModulo = function (_AnimatedWithChildren) {
  _inherits(AnimatedModulo, _AnimatedWithChildren);

  function AnimatedModulo(a, modulus) {
    _classCallCheck(this, AnimatedModulo);

    var _this = _possibleConstructorReturn(this, _AnimatedWithChildren.call(this));

    _this._a = a;
    _this._modulus = modulus;
    return _this;
  }

  AnimatedModulo.prototype.__makeNative = function __makeNative() {
    this._a.__makeNative();
    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  AnimatedModulo.prototype.__getValue = function __getValue() {
    return (this._a.__getValue() % this._modulus + this._modulus) % this._modulus;
  };

  AnimatedModulo.prototype.interpolate = function interpolate(config) {
    return new AnimatedInterpolation(this, config);
  };

  AnimatedModulo.prototype.__attach = function __attach() {
    this._a.__addChild(this);
  };

  AnimatedModulo.prototype.__detach = function __detach() {
    this._a.__removeChild(this);
    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  AnimatedModulo.prototype.__getNativeConfig = function __getNativeConfig() {
    return {
      type: 'modulus',
      input: this._a.__getNativeTag(),
      modulus: this._modulus
    };
  };

  return AnimatedModulo;
}(AnimatedWithChildren);

module.exports = AnimatedModulo;