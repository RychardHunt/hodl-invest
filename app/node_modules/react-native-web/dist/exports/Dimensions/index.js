'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright (c) 2015-present, Nicolas Gallagher.
                                                                                                                                                           * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                           * All rights reserved.
                                                                                                                                                           *
                                                                                                                                                           * This source code is licensed under the BSD-style license found in the
                                                                                                                                                           * LICENSE file in the root directory of this source tree.
                                                                                                                                                           *
                                                                                                                                                           * @providesModule Dimensions
                                                                                                                                                           * 
                                                                                                                                                           */

var win = _ExecutionEnvironment.canUseDOM ? window : {
  devicePixelRatio: undefined,
  innerHeight: undefined,
  innerWidth: undefined,
  screen: {
    height: undefined,
    width: undefined
  }
};

var dimensions = {};
var listeners = {};

var Dimensions = function () {
  function Dimensions() {
    _classCallCheck(this, Dimensions);
  }

  Dimensions.get = function get(dimension) {
    (0, _invariant2.default)(dimensions[dimension], 'No dimension set for key ' + dimension);
    return dimensions[dimension];
  };

  Dimensions.set = function set(initialDimensions) {
    if (initialDimensions) {
      if (_ExecutionEnvironment.canUseDOM) {
        (0, _invariant2.default)(false, 'Dimensions cannot be set in the browser');
      } else {
        dimensions.screen = initialDimensions.screen;
        dimensions.window = initialDimensions.window;
      }
    }
  };

  Dimensions._update = function _update() {
    dimensions.window = {
      fontScale: 1,
      height: win.innerHeight,
      scale: win.devicePixelRatio || 1,
      width: win.innerWidth
    };

    dimensions.screen = {
      fontScale: 1,
      height: win.screen.height,
      scale: win.devicePixelRatio || 1,
      width: win.screen.width
    };

    if (Array.isArray(listeners['change'])) {
      listeners['change'].forEach(function (handler) {
        return handler(dimensions);
      });
    }
  };

  Dimensions.addEventListener = function addEventListener(type, handler) {
    listeners[type] = listeners[type] || [];
    listeners[type].push(handler);
  };

  Dimensions.removeEventListener = function removeEventListener(type, handler) {
    if (Array.isArray(listeners[type])) {
      listeners[type] = listeners[type].filter(function (_handler) {
        return _handler !== handler;
      });
    }
  };

  return Dimensions;
}();

exports.default = Dimensions;


Dimensions._update();

if (_ExecutionEnvironment.canUseDOM) {
  window.addEventListener('resize', (0, _debounce2.default)(Dimensions._update, 16), false);
}