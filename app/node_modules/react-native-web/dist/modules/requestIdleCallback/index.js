'use strict';

exports.__esModule = true;
exports.cancelIdleCallback = undefined;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _requestIdleCallback = function _requestIdleCallback(cb, options) {
  return setTimeout(function () {
    var start = Date.now();
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

// $FlowFixMe (TimeoutID type is not recognized by eslint)
/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var _cancelIdleCallback = function _cancelIdleCallback(id) {
  clearTimeout(id);
};

var isSupported = _ExecutionEnvironment.canUseDOM && typeof window.requestIdleCallback !== 'undefined';

var requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
var cancelIdleCallback = isSupported ? window.cancelIdleCallback : _cancelIdleCallback;

exports.default = requestIdleCallback;
exports.cancelIdleCallback = cancelIdleCallback;