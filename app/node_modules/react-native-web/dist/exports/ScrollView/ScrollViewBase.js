'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var normalizeScrollEvent = function normalizeScrollEvent(e) {
  return {
    nativeEvent: {
      contentOffset: {
        get x() {
          return e.target.scrollLeft;
        },
        get y() {
          return e.target.scrollTop;
        }
      },
      contentSize: {
        get height() {
          return e.target.scrollHeight;
        },
        get width() {
          return e.target.scrollWidth;
        }
      },
      layoutMeasurement: {
        get height() {
          return e.target.offsetHeight;
        },
        get width() {
          return e.target.offsetWidth;
        }
      }
    },
    timeStamp: Date.now()
  };
};

/**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */

var ScrollViewBase = function (_Component) {
  _inherits(ScrollViewBase, _Component);

  function ScrollViewBase() {
    var _temp, _this, _ret;

    _classCallCheck(this, ScrollViewBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._debouncedOnScrollEnd = (0, _debounce2.default)(_this._handleScrollEnd, 100), _this._state = { isScrolling: false, scrollLastTick: 0 }, _this._createPreventableScrollHandler = function (handler) {
      return function (e) {
        if (_this.props.scrollEnabled) {
          if (handler) {
            handler(e);
          }
        } else {
          // To disable scrolling in all browsers except Chrome
          e.preventDefault();
        }
      };
    }, _this._handleScroll = function (e) {
      e.persist();
      e.stopPropagation();
      var scrollEventThrottle = _this.props.scrollEventThrottle;
      // A scroll happened, so the scroll bumps the debounce.

      _this._debouncedOnScrollEnd(e);
      if (_this._state.isScrolling) {
        // Scroll last tick may have changed, check if we need to notify
        if (_this._shouldEmitScrollEvent(_this._state.scrollLastTick, scrollEventThrottle)) {
          _this._handleScrollTick(e);
        }
      } else {
        // Weren't scrolling, so we must have just started
        _this._handleScrollStart(e);
      }
    }, _this._setViewRef = function (element) {
      _this._viewRef = element;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ScrollViewBase.prototype.setNativeProps = function setNativeProps(props) {
    if (this._viewRef) {
      this._viewRef.setNativeProps(props);
    }
  };

  ScrollViewBase.prototype.render = function render() {
    var _props = this.props,
        scrollEnabled = _props.scrollEnabled,
        style = _props.style,
        alwaysBounceHorizontal = _props.alwaysBounceHorizontal,
        alwaysBounceVertical = _props.alwaysBounceVertical,
        automaticallyAdjustContentInsets = _props.automaticallyAdjustContentInsets,
        bounces = _props.bounces,
        bouncesZoom = _props.bouncesZoom,
        canCancelContentTouches = _props.canCancelContentTouches,
        centerContent = _props.centerContent,
        contentInset = _props.contentInset,
        contentInsetAdjustmentBehavior = _props.contentInsetAdjustmentBehavior,
        contentOffset = _props.contentOffset,
        decelerationRate = _props.decelerationRate,
        directionalLockEnabled = _props.directionalLockEnabled,
        endFillColor = _props.endFillColor,
        indicatorStyle = _props.indicatorStyle,
        keyboardShouldPersistTaps = _props.keyboardShouldPersistTaps,
        maximumZoomScale = _props.maximumZoomScale,
        minimumZoomScale = _props.minimumZoomScale,
        onMomentumScrollBegin = _props.onMomentumScrollBegin,
        onMomentumScrollEnd = _props.onMomentumScrollEnd,
        onScrollBeginDrag = _props.onScrollBeginDrag,
        onScrollEndDrag = _props.onScrollEndDrag,
        overScrollMode = _props.overScrollMode,
        pinchGestureEnabled = _props.pinchGestureEnabled,
        removeClippedSubviews = _props.removeClippedSubviews,
        scrollEventThrottle = _props.scrollEventThrottle,
        scrollIndicatorInsets = _props.scrollIndicatorInsets,
        scrollPerfTag = _props.scrollPerfTag,
        scrollsToTop = _props.scrollsToTop,
        showsHorizontalScrollIndicator = _props.showsHorizontalScrollIndicator,
        showsVerticalScrollIndicator = _props.showsVerticalScrollIndicator,
        snapToInterval = _props.snapToInterval,
        snapToAlignment = _props.snapToAlignment,
        zoomScale = _props.zoomScale,
        other = _objectWithoutProperties(_props, ['scrollEnabled', 'style', 'alwaysBounceHorizontal', 'alwaysBounceVertical', 'automaticallyAdjustContentInsets', 'bounces', 'bouncesZoom', 'canCancelContentTouches', 'centerContent', 'contentInset', 'contentInsetAdjustmentBehavior', 'contentOffset', 'decelerationRate', 'directionalLockEnabled', 'endFillColor', 'indicatorStyle', 'keyboardShouldPersistTaps', 'maximumZoomScale', 'minimumZoomScale', 'onMomentumScrollBegin', 'onMomentumScrollEnd', 'onScrollBeginDrag', 'onScrollEndDrag', 'overScrollMode', 'pinchGestureEnabled', 'removeClippedSubviews', 'scrollEventThrottle', 'scrollIndicatorInsets', 'scrollPerfTag', 'scrollsToTop', 'showsHorizontalScrollIndicator', 'showsVerticalScrollIndicator', 'snapToInterval', 'snapToAlignment', 'zoomScale']);

    return _react2.default.createElement(_View2.default, _extends({}, other, {
      onScroll: this._handleScroll,
      onTouchMove: this._createPreventableScrollHandler(this.props.onTouchMove),
      onWheel: this._createPreventableScrollHandler(this.props.onWheel),
      ref: this._setViewRef,
      style: [style, !scrollEnabled && styles.scrollDisabled]
    }));
  };

  ScrollViewBase.prototype._handleScrollStart = function _handleScrollStart(e) {
    this._state.isScrolling = true;
    this._state.scrollLastTick = Date.now();
  };

  ScrollViewBase.prototype._handleScrollTick = function _handleScrollTick(e) {
    var onScroll = this.props.onScroll;

    this._state.scrollLastTick = Date.now();
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  };

  ScrollViewBase.prototype._handleScrollEnd = function _handleScrollEnd(e) {
    var onScroll = this.props.onScroll;

    this._state.isScrolling = false;
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  };

  ScrollViewBase.prototype._shouldEmitScrollEvent = function _shouldEmitScrollEvent(lastTick, eventThrottle) {
    var timeSinceLastTick = Date.now() - lastTick;
    return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
  };

  return ScrollViewBase;
}(_react.Component);

// Chrome doesn't support e.preventDefault in this case; touch-action must be
// used to disable scrolling.
// https://developers.google.com/web/updates/2017/01/scrolling-intervention


ScrollViewBase.defaultProps = {
  scrollEnabled: true,
  scrollEventThrottle: 0
};
exports.default = ScrollViewBase;
ScrollViewBase.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, _ViewPropTypes2.default, {
  onMomentumScrollBegin: _propTypes.func,
  onMomentumScrollEnd: _propTypes.func,
  onScroll: _propTypes.func,
  onScrollBeginDrag: _propTypes.func,
  onScrollEndDrag: _propTypes.func,
  onTouchMove: _propTypes.func,
  onWheel: _propTypes.func,
  removeClippedSubviews: _propTypes.bool,
  scrollEnabled: _propTypes.bool,
  scrollEventThrottle: _propTypes.number,
  showsHorizontalScrollIndicator: _propTypes.bool,
  showsVerticalScrollIndicator: _propTypes.bool
}) : {};
var styles = _StyleSheet2.default.create({
  scrollDisabled: {
    touchAction: 'none'
  }
});