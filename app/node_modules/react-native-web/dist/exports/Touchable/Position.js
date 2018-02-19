'use strict';

exports.__esModule = true;

var _PooledClass = require('../../vendor/PooledClass');

var _PooledClass2 = _interopRequireDefault(_PooledClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var twoArgumentPooler = _PooledClass2.default.twoArgumentPooler; /**
                                                                  * Copyright (c) 2015-present, Facebook, Inc.
                                                                  * All rights reserved.
                                                                  *
                                                                  * This source code is licensed under the BSD-style license found in the
                                                                  * LICENSE file in the root directory of this source tree.
                                                                  *
                                                                  * @noflow
                                                                  */

function Position(left, top) {
  this.left = left;
  this.top = top;
}

Position.prototype.destructor = function () {
  this.left = null;
  this.top = null;
};

_PooledClass2.default.addPoolingTo(Position, twoArgumentPooler);

exports.default = Position;