'use strict';

exports.__esModule = true;

var _ListViewDataSource = require('./ListViewDataSource');

var _ListViewDataSource2 = _interopRequireDefault(_ListViewDataSource);

var _ScrollView = require('../ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.assign({}, _ScrollView2.default.propTypes, {
  dataSource: (0, _propTypes.instanceOf)(_ListViewDataSource2.default).isRequired,
  renderSeparator: _propTypes.func,
  renderRow: _propTypes.func.isRequired,
  initialListSize: _propTypes.number,
  onEndReached: _propTypes.func,
  onEndReachedThreshold: _propTypes.number,
  pageSize: _propTypes.number,
  renderFooter: _propTypes.func,
  renderHeader: _propTypes.func,
  renderSectionHeader: _propTypes.func,
  renderScrollComponent: _propTypes.func.isRequired,
  scrollRenderAheadDistance: _propTypes.number,
  onChangeVisibleRows: _propTypes.func,
  removeClippedSubviews: _propTypes.bool,
  stickyHeaderIndices: (0, _propTypes.arrayOf)(_propTypes.number)
});