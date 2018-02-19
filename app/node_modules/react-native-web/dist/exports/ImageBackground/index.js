'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ensureComponentIsNative = require('../../modules/ensureComponentIsNative');

var _ensureComponentIsNative2 = _interopRequireDefault(_ensureComponentIsNative);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var emptyObject = {};

/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */

var ImageBackground = function (_Component) {
  _inherits(ImageBackground, _Component);

  function ImageBackground() {
    var _temp, _this, _ret;

    _classCallCheck(this, ImageBackground);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._viewRef = null, _this._captureRef = function (ref) {
      _this._viewRef = ref;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ImageBackground.prototype.setNativeProps = function setNativeProps(props) {
    // Work-around flow
    var viewRef = this._viewRef;
    if (viewRef) {
      (0, _ensureComponentIsNative2.default)(viewRef);
      viewRef.setNativeProps(props);
    }
  };

  ImageBackground.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        style = _props.style,
        imageStyle = _props.imageStyle,
        imageRef = _props.imageRef,
        props = _objectWithoutProperties(_props, ['children', 'style', 'imageStyle', 'imageRef']);

    return _react2.default.createElement(
      _View2.default,
      { ref: this._captureRef, style: style },
      _react2.default.createElement(_Image2.default, _extends({}, props, {
        ref: imageRef,
        style: [_StyleSheet2.default.absoluteFill, {
          // Temporary Workaround:
          // Current (imperfect yet) implementation of <Image> overwrites width and height styles
          // (which is not quite correct), and these styles conflict with explicitly set styles
          // of <ImageBackground> and with our internal layout model here.
          // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
          // This workaround should be removed after implementing proper support of
          // intrinsic content size of the <Image>.
          width: style.width,
          height: style.height
        }, imageStyle]
      })),
      children
    );
  };

  return ImageBackground;
}(_react.Component);

ImageBackground.defaultProps = {
  style: emptyObject
};
ImageBackground.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, _Image2.default.propTypes, {
  imageStyle: _Image2.default.propTypes.style,
  style: _ViewPropTypes2.default.style
}) : {};
exports.default = ImageBackground;