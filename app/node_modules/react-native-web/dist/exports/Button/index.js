'use strict';

exports.__esModule = true;

var _ColorPropType = require('../ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _TouchableOpacity = require('../TouchableOpacity');

var _TouchableOpacity2 = _interopRequireDefault(_TouchableOpacity);

var _Text = require('../Text');

var _Text2 = _interopRequireDefault(_Text);

var _propTypes = require('prop-types');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule Button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Button.prototype.render = function render() {
    var _props = this.props,
        accessibilityLabel = _props.accessibilityLabel,
        color = _props.color,
        disabled = _props.disabled,
        onPress = _props.onPress,
        testID = _props.testID,
        title = _props.title;


    return _react2.default.createElement(
      _TouchableOpacity2.default,
      {
        accessibilityLabel: accessibilityLabel,
        accessibilityRole: 'button',
        disabled: disabled,
        onPress: onPress,
        style: [styles.button, color && { backgroundColor: color }, disabled && styles.buttonDisabled],
        testID: testID
      },
      _react2.default.createElement(
        _Text2.default,
        { style: [styles.text, disabled && styles.textDisabled] },
        title
      )
    );
  };

  return Button;
}(_react.Component);

Button.propTypes = process.env.NODE_ENV !== "production" ? {
  accessibilityLabel: _propTypes.string,
  color: _ColorPropType2.default,
  disabled: _propTypes.bool,
  onPress: _propTypes.func.isRequired,
  testID: _propTypes.string,
  title: _propTypes.string.isRequired
} : {};


var styles = _StyleSheet2.default.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

exports.default = Button;