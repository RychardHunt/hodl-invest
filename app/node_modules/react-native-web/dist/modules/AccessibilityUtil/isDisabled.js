'use strict';

exports.__esModule = true;
/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isDisabled = function isDisabled(props) {
  return props.disabled || props['aria-disabled'];
};

exports.default = isDisabled;