'use strict';

exports.__esModule = true;

var _ColorPropType = require('../ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _react = require('react');

var _createElement = require('../createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerItem = function (_Component) {
  _inherits(PickerItem, _Component);

  function PickerItem() {
    _classCallCheck(this, PickerItem);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  PickerItem.prototype.render = function render() {
    var _props = this.props,
        label = _props.label,
        testID = _props.testID,
        value = _props.value;

    return (0, _createElement2.default)('option', { testID: testID, value: value }, label);
  };

  return PickerItem;
}(_react.Component);

exports.default = PickerItem;
PickerItem.propTypes = process.env.NODE_ENV !== "production" ? {
  color: _ColorPropType2.default,
  label: _propTypes.string.isRequired,
  testID: _propTypes.string,
  value: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string])
} : {};