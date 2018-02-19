/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedTracking
 * 
 * @format
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedValue = require('./AnimatedValue');
var AnimatedNode = require('./AnimatedNode');

var AnimatedTracking = function (_AnimatedNode) {
  _inherits(AnimatedTracking, _AnimatedNode);

  function AnimatedTracking(value, parent, animationClass, animationConfig, callback) {
    _classCallCheck(this, AnimatedTracking);

    var _this = _possibleConstructorReturn(this, _AnimatedNode.call(this));

    _this._value = value;
    _this._parent = parent;
    _this._animationClass = animationClass;
    _this._animationConfig = animationConfig;
    _this._callback = callback;
    _this.__attach();
    return _this;
  }

  AnimatedTracking.prototype.__getValue = function __getValue() {
    return this._parent.__getValue();
  };

  AnimatedTracking.prototype.__attach = function __attach() {
    this._parent.__addChild(this);
  };

  AnimatedTracking.prototype.__detach = function __detach() {
    this._parent.__removeChild(this);
    _AnimatedNode.prototype.__detach.call(this);
  };

  AnimatedTracking.prototype.update = function update() {
    this._value.animate(new this._animationClass(Object.assign({}, this._animationConfig, {
      toValue: this._animationConfig.toValue.__getValue()
    })), this._callback);
  };

  return AnimatedTracking;
}(AnimatedNode);

module.exports = AnimatedTracking;