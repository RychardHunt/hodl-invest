'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @providesModule AppState
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @noflow
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _arrayFindIndex = require('array-find-index');

var _arrayFindIndex2 = _interopRequireDefault(_arrayFindIndex);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Android 4.4 browser
var isPrefixed = _ExecutionEnvironment.canUseDOM && !document.hasOwnProperty('hidden') && document.hasOwnProperty('webkitHidden');

var EVENT_TYPES = ['change'];
var VISIBILITY_CHANGE_EVENT = isPrefixed ? 'webkitvisibilitychange' : 'visibilitychange';
var VISIBILITY_STATE_PROPERTY = isPrefixed ? 'webkitVisibilityState' : 'visibilityState';

var AppStates = {
  BACKGROUND: 'background',
  ACTIVE: 'active'
};

var listeners = [];

var AppState = function () {
  function AppState() {
    _classCallCheck(this, AppState);
  }

  AppState.addEventListener = function addEventListener(type, handler) {
    if (AppState.isAvailable) {
      (0, _invariant2.default)(EVENT_TYPES.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
      var callback = function callback() {
        return handler(AppState.currentState);
      };
      listeners.push([handler, callback]);
      document.addEventListener(VISIBILITY_CHANGE_EVENT, callback, false);
    }
  };

  AppState.removeEventListener = function removeEventListener(type, handler) {
    if (AppState.isAvailable) {
      (0, _invariant2.default)(EVENT_TYPES.indexOf(type) !== -1, 'Trying to remove listener for unknown event: "%s"', type);
      var listenerIndex = (0, _arrayFindIndex2.default)(listeners, function (pair) {
        return pair[0] === handler;
      });
      (0, _invariant2.default)(listenerIndex !== -1, 'Trying to remove AppState listener for unregistered handler');
      var callback = listeners[listenerIndex][1];
      document.removeEventListener(VISIBILITY_CHANGE_EVENT, callback, false);
      listeners.splice(listenerIndex, 1);
    }
  };

  _createClass(AppState, null, [{
    key: 'currentState',
    get: function get() {
      if (!AppState.isAvailable) {
        return AppStates.ACTIVE;
      }

      switch (document[VISIBILITY_STATE_PROPERTY]) {
        case 'hidden':
        case 'prerender':
        case 'unloaded':
          return AppStates.BACKGROUND;
        default:
          return AppStates.ACTIVE;
      }
    }
  }]);

  return AppState;
}();

AppState.isAvailable = _ExecutionEnvironment.canUseDOM && document[VISIBILITY_STATE_PROPERTY];
exports.default = AppState;