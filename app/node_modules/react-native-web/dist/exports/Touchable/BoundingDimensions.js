'use strict';

exports.__esModule = true;

var _PooledClass = require('../../vendor/PooledClass');

var _PooledClass2 = _interopRequireDefault(_PooledClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var twoArgumentPooler = _PooledClass2.default.twoArgumentPooler;

/**
 * PooledClass representing the bounding rectangle of a region.
 */
/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function BoundingDimensions(width, height) {
  this.width = width;
  this.height = height;
}

BoundingDimensions.prototype.destructor = function () {
  this.width = null;
  this.height = null;
};

BoundingDimensions.getPooledFromElement = function (element) {
  return BoundingDimensions.getPooled(element.offsetWidth, element.offsetHeight);
};

_PooledClass2.default.addPoolingTo(BoundingDimensions, twoArgumentPooler);

exports.default = BoundingDimensions;