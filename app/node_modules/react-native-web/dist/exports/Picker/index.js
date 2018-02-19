'use strict';

exports.__esModule = true;

var _applyNativeMethods = require('../../modules/applyNativeMethods');

var _applyNativeMethods2 = _interopRequireDefault(_applyNativeMethods);

var _react = require('react');

var _createElement = require('../createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _PickerItem = require('./PickerItem');

var _PickerItem2 = _interopRequireDefault(_PickerItem);

var _PickerItemPropType = require('./PickerItemPropType');

var _PickerItemPropType2 = _interopRequireDefault(_PickerItemPropType);

var _PickerStylePropTypes = require('./PickerStylePropTypes');

var _PickerStylePropTypes2 = _interopRequireDefault(_PickerStylePropTypes);

var _StyleSheetPropType = require('../../modules/StyleSheetPropType');

var _StyleSheetPropType2 = _interopRequireDefault(_StyleSheetPropType);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _TextPropTypes = require('../Text/TextPropTypes');

var _TextPropTypes2 = _interopRequireDefault(_TextPropTypes);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule Picker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var pickerStyleType = (0, _StyleSheetPropType2.default)(_PickerStylePropTypes2.default);

var Picker = function (_Component) {
  _inherits(Picker, _Component);

  function Picker() {
    var _temp, _this, _ret;

    _classCallCheck(this, Picker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._handleChange = function (e) {
      var onValueChange = _this.props.onValueChange;
      var _e$target = e.target,
          selectedIndex = _e$target.selectedIndex,
          value = _e$target.value;

      if (onValueChange) {
        onValueChange(value, selectedIndex);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Picker.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        enabled = _props.enabled,
        selectedValue = _props.selectedValue,
        style = _props.style,
        testID = _props.testID,
        itemStyle = _props.itemStyle,
        mode = _props.mode,
        prompt = _props.prompt;


    return (0, _createElement2.default)('select', {
      children: children,
      disabled: enabled === false ? true : undefined,
      onChange: this._handleChange,
      style: [styles.initial, style],
      testID: testID,
      value: selectedValue
    });
  };

  return Picker;
}(_react.Component);

Picker.Item = _PickerItem2.default;
Picker.propTypes = process.env.NODE_ENV !== "production" ? {
  children: (0, _propTypes.arrayOf)(_PickerItemPropType2.default),
  enabled: _propTypes.bool,
  onValueChange: _propTypes.func,
  selectedValue: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]),
  style: pickerStyleType,
  testID: _propTypes.string
} : {};


var styles = _StyleSheet2.default.create({
  initial: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0
  }
});

exports.default = (0, _applyNativeMethods2.default)(Picker);