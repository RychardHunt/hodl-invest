/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DecayAnimation
 * 
 * @format
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Animation = require('./Animation');

var _require = require('../NativeAnimatedHelper'),
    shouldUseNativeDriver = _require.shouldUseNativeDriver;

var DecayAnimation = function (_Animation) {
  _inherits(DecayAnimation, _Animation);

  function DecayAnimation(config) {
    _classCallCheck(this, DecayAnimation);

    var _this = _possibleConstructorReturn(this, _Animation.call(this));

    _this._deceleration = config.deceleration !== undefined ? config.deceleration : 0.998;
    _this._velocity = config.velocity;
    _this._useNativeDriver = shouldUseNativeDriver(config);
    _this.__isInteraction = config.isInteraction !== undefined ? config.isInteraction : true;
    _this.__iterations = config.iterations !== undefined ? config.iterations : 1;
    return _this;
  }

  DecayAnimation.prototype.__getNativeAnimationConfig = function __getNativeAnimationConfig() {
    return {
      type: 'decay',
      deceleration: this._deceleration,
      velocity: this._velocity,
      iterations: this.__iterations
    };
  };

  DecayAnimation.prototype.start = function start(fromValue, onUpdate, onEnd, previousAnimation, animatedValue) {
    this.__active = true;
    this._lastValue = fromValue;
    this._fromValue = fromValue;
    this._onUpdate = onUpdate;
    this.__onEnd = onEnd;
    this._startTime = Date.now();
    if (this._useNativeDriver) {
      this.__startNativeAnimation(animatedValue);
    } else {
      this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
    }
  };

  DecayAnimation.prototype.onUpdate = function onUpdate() {
    var now = Date.now();

    var value = this._fromValue + this._velocity / (1 - this._deceleration) * (1 - Math.exp(-(1 - this._deceleration) * (now - this._startTime)));

    this._onUpdate(value);

    if (Math.abs(this._lastValue - value) < 0.1) {
      this.__debouncedOnEnd({ finished: true });
      return;
    }

    this._lastValue = value;
    if (this.__active) {
      this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
    }
  };

  DecayAnimation.prototype.stop = function stop() {
    _Animation.prototype.stop.call(this);
    this.__active = false;
    global.cancelAnimationFrame(this._animationFrame);
    this.__debouncedOnEnd({ finished: false });
  };

  return DecayAnimation;
}(Animation);

module.exports = DecayAnimation;