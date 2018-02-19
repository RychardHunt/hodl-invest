/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedValueXY
 * 
 * @format
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedValue = require('./AnimatedValue');
var AnimatedWithChildren = require('./AnimatedWithChildren');

var invariant = require('fbjs/lib/invariant');

var _uniqueId = 1;

/**
 * 2D Value for driving 2D animations, such as pan gestures. Almost identical 
 * API to normal `Animated.Value`, but multiplexed.
 * 
 * See http://facebook.github.io/react-native/docs/animatedvaluexy.html
 */

var AnimatedValueXY = function (_AnimatedWithChildren) {
  _inherits(AnimatedValueXY, _AnimatedWithChildren);

  function AnimatedValueXY(valueIn) {
    _classCallCheck(this, AnimatedValueXY);

    var _this = _possibleConstructorReturn(this, _AnimatedWithChildren.call(this));

    var value = valueIn || { x: 0, y: 0 }; // fixme: shouldn't need `: any`
    if (typeof value.x === 'number' && typeof value.y === 'number') {
      _this.x = new AnimatedValue(value.x);
      _this.y = new AnimatedValue(value.y);
    } else {
      invariant(value.x instanceof AnimatedValue && value.y instanceof AnimatedValue, 'AnimatedValueXY must be initalized with an object of numbers or ' + 'AnimatedValues.');
      _this.x = value.x;
      _this.y = value.y;
    }
    _this._listeners = {};
    return _this;
  }

  /**
   * Directly set the value. This will stop any animations running on the value
   * and update all the bound properties.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#setvalue
   */


  AnimatedValueXY.prototype.setValue = function setValue(value) {
    this.x.setValue(value.x);
    this.y.setValue(value.y);
  };

  /**
   * Sets an offset that is applied on top of whatever value is set, whether 
   * via `setValue`, an animation, or `Animated.event`. Useful for compensating 
   * things like the start of a pan gesture.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#setoffset
   */


  AnimatedValueXY.prototype.setOffset = function setOffset(offset) {
    this.x.setOffset(offset.x);
    this.y.setOffset(offset.y);
  };

  /**
   * Merges the offset value into the base value and resets the offset to zero. 
   * The final output of the value is unchanged.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#flattenoffset
   */


  AnimatedValueXY.prototype.flattenOffset = function flattenOffset() {
    this.x.flattenOffset();
    this.y.flattenOffset();
  };

  /**
   * Sets the offset value to the base value, and resets the base value to 
   * zero. The final output of the value is unchanged.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#extractoffset
   */


  AnimatedValueXY.prototype.extractOffset = function extractOffset() {
    this.x.extractOffset();
    this.y.extractOffset();
  };

  AnimatedValueXY.prototype.__getValue = function __getValue() {
    return {
      x: this.x.__getValue(),
      y: this.y.__getValue()
    };
  };

  /**
   * Stops any animation and resets the value to its original.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#resetanimation
   */


  AnimatedValueXY.prototype.resetAnimation = function resetAnimation(callback) {
    this.x.resetAnimation();
    this.y.resetAnimation();
    callback && callback(this.__getValue());
  };

  /**
   * Stops any running animation or tracking. `callback` is invoked with the 
   * final value after stopping the animation, which is useful for updating 
   * state to match the animation position with layout.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#stopanimation
   */


  AnimatedValueXY.prototype.stopAnimation = function stopAnimation(callback) {
    this.x.stopAnimation();
    this.y.stopAnimation();
    callback && callback(this.__getValue());
  };

  /**
   * Adds an asynchronous listener to the value so you can observe updates from 
   * animations.  This is useful because there is no way to synchronously read 
   * the value because it might be driven natively.
   * 
   * Returns a string that serves as an identifier for the listener.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#addlistener
   */


  AnimatedValueXY.prototype.addListener = function addListener(callback) {
    var _this2 = this;

    var id = String(_uniqueId++);
    var jointCallback = function jointCallback(_ref) {
      var number = _ref.value;

      callback(_this2.__getValue());
    };
    this._listeners[id] = {
      x: this.x.addListener(jointCallback),
      y: this.y.addListener(jointCallback)
    };
    return id;
  };

  /**
   * Unregister a listener. The `id` param shall match the identifier 
   * previously returned by `addListener()`. 
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#removelistener
   */


  AnimatedValueXY.prototype.removeListener = function removeListener(id) {
    this.x.removeListener(this._listeners[id].x);
    this.y.removeListener(this._listeners[id].y);
    delete this._listeners[id];
  };

  /**
   * Remove all registered listeners.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#removealllisteners
   */


  AnimatedValueXY.prototype.removeAllListeners = function removeAllListeners() {
    this.x.removeAllListeners();
    this.y.removeAllListeners();
    this._listeners = {};
  };

  /**
   * Converts `{x, y}` into `{left, top}` for use in style.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#getlayout
   */


  AnimatedValueXY.prototype.getLayout = function getLayout() {
    return {
      left: this.x,
      top: this.y
    };
  };

  /**
   * Converts `{x, y}` into a useable translation transform.
   * 
   * See http://facebook.github.io/react-native/docs/animatedvaluexy.html#gettranslatetransform
   */


  AnimatedValueXY.prototype.getTranslateTransform = function getTranslateTransform() {
    return [{ translateX: this.x }, { translateY: this.y }];
  };

  return AnimatedValueXY;
}(AnimatedWithChildren);

module.exports = AnimatedValueXY;