/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createAnimatedComponent
 * 
 * @format
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./AnimatedEvent'),
    AnimatedEvent = _require.AnimatedEvent;

var AnimatedProps = require('./nodes/AnimatedProps');
var React = require('react');
var ViewStylePropTypes = require('../../exports/View/ViewStylePropTypes').default;

function createAnimatedComponent(Component) {
  var AnimatedComponent = function (_React$Component) {
    _inherits(AnimatedComponent, _React$Component);

    function AnimatedComponent(props) {
      _classCallCheck(this, AnimatedComponent);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this._invokeAnimatedPropsCallbackOnMount = false;
      _this._eventDetachers = [];

      _this._animatedPropsCallback = function () {
        if (_this._component == null) {
          // AnimatedProps is created in will-mount because it's used in render.
          // But this callback may be invoked before mount in async mode,
          // In which case we should defer the setNativeProps() call.
          // React may throw away uncommitted work in async mode,
          // So a deferred call won't always be invoked.
          _this._invokeAnimatedPropsCallbackOnMount = true;
        } else if (AnimatedComponent.__skipSetNativeProps_FOR_TESTS_ONLY || typeof _this._component.setNativeProps !== 'function') {
          _this.forceUpdate();
        } else if (!_this._propsAnimated.__isNative) {
          _this._component.setNativeProps(_this._propsAnimated.__getAnimatedValue());
        } else {
          throw new Error('Attempting to run JS driven animation on animated ' + 'node that has been moved to "native" earlier by starting an ' + 'animation with `useNativeDriver: true`');
        }
      };

      _this._setComponentRef = _this._setComponentRef.bind(_this);
      return _this;
    }

    AnimatedComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this._propsAnimated && this._propsAnimated.__detach();
      this._detachNativeEvents();
    };

    AnimatedComponent.prototype.setNativeProps = function setNativeProps(props) {
      this._component.setNativeProps(props);
    };

    AnimatedComponent.prototype.componentWillMount = function componentWillMount() {
      this._attachProps(this.props);
    };

    AnimatedComponent.prototype.componentDidMount = function componentDidMount() {
      if (this._invokeAnimatedPropsCallbackOnMount) {
        this._invokeAnimatedPropsCallbackOnMount = false;
        this._animatedPropsCallback();
      }

      this._propsAnimated.setNativeView(this._component);
      this._attachNativeEvents();
    };

    AnimatedComponent.prototype._attachNativeEvents = function _attachNativeEvents() {
      var _this2 = this;

      // Make sure to get the scrollable node for components that implement
      // `ScrollResponder.Mixin`.
      var scrollableNode = this._component.getScrollableNode ? this._component.getScrollableNode() : this._component;

      var _loop = function _loop(key) {
        var prop = _this2.props[key];
        if (prop instanceof AnimatedEvent && prop.__isNative) {
          prop.__attach(scrollableNode, key);
          _this2._eventDetachers.push(function () {
            return prop.__detach(scrollableNode, key);
          });
        }
      };

      for (var key in this.props) {
        _loop(key);
      }
    };

    AnimatedComponent.prototype._detachNativeEvents = function _detachNativeEvents() {
      this._eventDetachers.forEach(function (remove) {
        return remove();
      });
      this._eventDetachers = [];
    };

    // The system is best designed when setNativeProps is implemented. It is
    // able to avoid re-rendering and directly set the attributes that changed.
    // However, setNativeProps can only be implemented on leaf native
    // components. If you want to animate a composite component, you need to
    // re-render it. In this case, we have a fallback that uses forceUpdate.


    AnimatedComponent.prototype._attachProps = function _attachProps(nextProps) {
      var oldPropsAnimated = this._propsAnimated;

      this._propsAnimated = new AnimatedProps(nextProps, this._animatedPropsCallback);

      // When you call detach, it removes the element from the parent list
      // of children. If it goes to 0, then the parent also detaches itself
      // and so on.
      // An optimization is to attach the new elements and THEN detach the old
      // ones instead of detaching and THEN attaching.
      // This way the intermediate state isn't to go to 0 and trigger
      // this expensive recursive detaching to then re-attach everything on
      // the very next operation.
      oldPropsAnimated && oldPropsAnimated.__detach();
    };

    AnimatedComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
      this._attachProps(newProps);
    };

    AnimatedComponent.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this._component !== this._prevComponent) {
        this._propsAnimated.setNativeView(this._component);
      }
      if (this._component !== this._prevComponent || prevProps !== this.props) {
        this._detachNativeEvents();
        this._attachNativeEvents();
      }
    };

    AnimatedComponent.prototype.render = function render() {
      var props = this._propsAnimated.__getValue();
      return React.createElement(Component, _extends({}, props, {
        ref: this._setComponentRef
        // The native driver updates views directly through the UI thread so we
        // have to make sure the view doesn't get optimized away because it cannot
        // go through the NativeViewHierachyManager since it operates on the shadow
        // thread.
        , collapsable: this._propsAnimated.__isNative ? false : props.collapsable
      }));
    };

    AnimatedComponent.prototype._setComponentRef = function _setComponentRef(c) {
      this._prevComponent = this._component;
      this._component = c;
    };

    // A third party library can use getNode()
    // to get the node reference of the decorated component


    AnimatedComponent.prototype.getNode = function getNode() {
      return this._component;
    };

    return AnimatedComponent;
  }(React.Component);

  AnimatedComponent.__skipSetNativeProps_FOR_TESTS_ONLY = false;


  var propTypes = Component.propTypes;

  AnimatedComponent.propTypes = process.env.NODE_ENV !== "production" ? {
    style: function style(props, propName, componentName) {
      if (!propTypes) {
        return;
      }

      for (var key in ViewStylePropTypes) {
        if (!propTypes[key] && props[key] !== undefined) {
          console.warn('You are setting the style `{ ' + key + ': ... }` as a prop. You ' + 'should nest it in a style object. ' + 'E.g. `{ style: { ' + key + ': ... } }`');
        }
      }
    }
  } : {};

  return AnimatedComponent;
}

module.exports = createAnimatedComponent;