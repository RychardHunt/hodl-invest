'use strict';

exports.__esModule = true;

var _ColorPropType = require('../ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _propTypes = require('prop-types');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule RefreshControl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RefreshControl = function (_Component) {
  _inherits(RefreshControl, _Component);

  function RefreshControl() {
    _classCallCheck(this, RefreshControl);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  RefreshControl.prototype.render = function render() {
    var _props = this.props,
        colors = _props.colors,
        enabled = _props.enabled,
        onRefresh = _props.onRefresh,
        progressBackgroundColor = _props.progressBackgroundColor,
        progressViewOffset = _props.progressViewOffset,
        refreshing = _props.refreshing,
        size = _props.size,
        tintColor = _props.tintColor,
        title = _props.title,
        titleColor = _props.titleColor,
        rest = _objectWithoutProperties(_props, ['colors', 'enabled', 'onRefresh', 'progressBackgroundColor', 'progressViewOffset', 'refreshing', 'size', 'tintColor', 'title', 'titleColor']);

    return _react2.default.createElement(_View2.default, rest);
  };

  return RefreshControl;
}(_react.Component);

RefreshControl.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, _ViewPropTypes2.default, {
  colors: (0, _propTypes.arrayOf)(_ColorPropType2.default),
  enabled: _propTypes.bool,
  onRefresh: _propTypes.func,
  progressBackgroundColor: _ColorPropType2.default,
  progressViewOffset: _propTypes.number,
  refreshing: _propTypes.bool.isRequired,
  size: (0, _propTypes.oneOf)([0, 1]),
  tintColor: _ColorPropType2.default,
  title: _propTypes.string,
  titleColor: _ColorPropType2.default
}) : {};
exports.default = RefreshControl;