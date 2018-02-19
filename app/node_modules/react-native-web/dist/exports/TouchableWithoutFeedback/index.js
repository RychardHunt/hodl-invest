'use strict';

exports.__esModule = true;

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _EdgeInsetsPropType = require('../EdgeInsetsPropType');

var _EdgeInsetsPropType2 = _interopRequireDefault(_EdgeInsetsPropType);

var _ensurePositiveDelayProps = require('../Touchable/ensurePositiveDelayProps');

var _ensurePositiveDelayProps2 = _interopRequireDefault(_ensurePositiveDelayProps);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _Touchable = require('../Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                              * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                              * All rights reserved.
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                              * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * @providesModule TouchableWithoutFeedback
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              */

var PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * Do not use unless you have a very good reason. All elements that
 * respond to press should have a visual feedback when touched.
 *
 * TouchableWithoutFeedback supports only one child.
 * If you wish to have several child components, wrap them in a View.
 */

/* eslint-disable react/prefer-es6-class, react/prop-types */
var TouchableWithoutFeedback = (0, _createReactClass2.default)({
  displayName: 'TouchableWithoutFeedback',
  mixins: [_reactTimerMixin2.default, _Touchable2.default.Mixin],

  propTypes: {
    accessibilityComponentType: _ViewPropTypes2.default.accessibilityComponentType,
    accessibilityLabel: _propTypes.string,
    accessibilityRole: _ViewPropTypes2.default.accessibilityRole,
    accessibilityTraits: _ViewPropTypes2.default.accessibilityTraits,
    accessible: _propTypes.bool,
    children: _propTypes.any,
    /**
     * Delay in ms, from onPressIn, before onLongPress is called.
     */
    delayLongPress: _propTypes.number,
    /**
     * Delay in ms, from the start of the touch, before onPressIn is called.
     */
    delayPressIn: _propTypes.number,
    /**
     * Delay in ms, from the release of the touch, before onPressOut is called.
     */
    delayPressOut: _propTypes.number,
    /**
     * If true, disable all interactions for this component.
     */
    disabled: _propTypes.bool,
    /**
     * This defines how far your touch can start away from the button. This is
     * added to `pressRetentionOffset` when moving off of the button.
     */
    // $FlowFixMe(>=0.41.0)
    hitSlop: _EdgeInsetsPropType2.default,
    /**
     * Invoked on mount and layout changes with
     *
     *   `{nativeEvent: {layout: {x, y, width, height}}}`
     */
    onLayout: _propTypes.func,
    onLongPress: _propTypes.func,
    /**
     * Called when the touch is released, but not if cancelled (e.g. by a scroll
     * that steals the responder lock).
     */
    onPress: _propTypes.func,
    onPressIn: _propTypes.func,
    onPressOut: _propTypes.func,
    /**
     * When the scroll view is disabled, this defines how far your touch may
     * move off of the button, before deactivating the button. Once deactivated,
     * try moving it back and you'll see that the button is once again
     * reactivated! Move it back and forth several times while the scroll view
     * is disabled. Ensure you pass in a constant to reduce memory allocations.
     */
    // $FlowFixMe
    pressRetentionOffset: _EdgeInsetsPropType2.default,
    testID: _propTypes.string
  },

  getInitialState: function getInitialState() {
    return this.touchableGetInitialState();
  },

  componentDidMount: function componentDidMount() {
    (0, _ensurePositiveDelayProps2.default)(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    (0, _ensurePositiveDelayProps2.default)(nextProps);
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandlePress: function touchableHandlePress(e) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandleLongPress: function touchableHandleLongPress(e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function touchableGetPressRectOffset() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function touchableGetHitSlop() {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function touchableGetHighlightDelayMS() {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS: function touchableGetLongPressDelayMS() {
    return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS: function touchableGetPressOutDelayMS() {
    return this.props.delayPressOut || 0;
  },

  render: function render() {
    var _props = this.props,
        delayLongPress = _props.delayLongPress,
        delayPressIn = _props.delayPressIn,
        delayPressOut = _props.delayPressOut,
        onLongPress = _props.onLongPress,
        onPress = _props.onPress,
        onPressIn = _props.onPressIn,
        onPressOut = _props.onPressOut,
        pressRetentionOffset = _props.pressRetentionOffset,
        other = _objectWithoutProperties(_props, ['delayLongPress', 'delayPressIn', 'delayPressOut', 'onLongPress', 'onPress', 'onPressIn', 'onPressOut', 'pressRetentionOffset']);

    // Note(avik): remove dynamic typecast once Flow has been upgraded
    // $FlowFixMe


    var child = _react2.default.Children.only(this.props.children);
    var children = child.props.children;
    (0, _warning2.default)(!child.type || child.type.displayName !== 'Text', 'TouchableWithoutFeedback does not work well with Text children. Wrap children in a View instead. See ' + (child._owner && child._owner.getName && child._owner.getName() || '<unknown>'));
    if (process.env.NODE_ENV !== 'production' && _Touchable2.default.TOUCH_TARGET_DEBUG && child.type && child.type.displayName === 'View') {
      children = _react2.default.Children.toArray(children);
      children.push(_Touchable2.default.renderDebugView({ color: 'red', hitSlop: this.props.hitSlop }));
    }
    var style = _Touchable2.default.TOUCH_TARGET_DEBUG && child.type && child.type.displayName === 'Text' ? [!this.props.disabled && styles.actionable, child.props.style, { color: 'red' }] : [!this.props.disabled && styles.actionable, child.props.style];
    return _react2.default.cloneElement(child, Object.assign({}, other, {
      accessible: this.props.accessible !== false,
      children: children,
      onKeyDown: this.touchableHandleKeyEvent,
      onKeyUp: this.touchableHandleKeyEvent,
      onResponderGrant: this.touchableHandleResponderGrant,
      onResponderMove: this.touchableHandleResponderMove,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      style: style
    }));
  }
});

var styles = _StyleSheet2.default.create({
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulate'
  }
});

exports.default = TouchableWithoutFeedback;