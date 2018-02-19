'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _ExecutionEnvironment2 = _interopRequireDefault(_ExecutionEnvironment);

var _arrayFindIndex = require('array-find-index');

var _arrayFindIndex2 = _interopRequireDefault(_arrayFindIndex);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _ExecutionEnvironment2.default.canUseDOM && (window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection);

// Prevent the underlying event handlers from leaking and include additional
// properties available in browsers
/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule NetInfo
 * 
 */

var getConnectionInfoObject = function getConnectionInfoObject() {
  var result = {
    effectiveType: 'unknown',
    type: 'unknown'
  };
  if (!connection) {
    return result;
  }
  for (var prop in connection) {
    var value = connection[prop];
    if (typeof value !== 'function' && value != null) {
      result[prop] = value;
    }
  }
  return result;
};

// Map React Native events to browser equivalents
var eventTypesMap = {
  change: 'change',
  connectionChange: 'change'
};
var eventTypes = Object.keys(eventTypesMap);

var connectionListeners = [];
var netInfoListeners = [];

/**
 * Navigator online: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 * Network Connection API: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
var NetInfo = {
  addEventListener: function addEventListener(type, handler) {
    (0, _invariant2.default)(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
    if (type === 'change') {
      console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
    }
    if (!connection) {
      console.error('Network Connection API is not supported. Not listening for connection type changes.');
      return {
        remove: function remove() {}
      };
    }

    var wrappedHandler = function wrappedHandler() {
      return handler(getConnectionInfoObject());
    };
    netInfoListeners.push([handler, wrappedHandler]);
    connection.addEventListener(eventTypesMap[type], wrappedHandler);
    return {
      remove: function remove() {
        return NetInfo.removeEventListener(eventTypesMap[type], handler);
      }
    };
  },
  removeEventListener: function removeEventListener(type, handler) {
    (0, _invariant2.default)(eventTypes.indexOf(type) !== -1, 'Trying to unsubscribe from unknown event: "%s"', type);
    if (type === 'change') {
      console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
    }

    var listenerIndex = (0, _arrayFindIndex2.default)(netInfoListeners, function (pair) {
      return pair[0] === handler;
    });
    (0, _invariant2.default)(listenerIndex !== -1, 'Trying to remove NetInfo listener for unregistered handler');
    var _netInfoListeners$lis = netInfoListeners[listenerIndex],
        wrappedHandler = _netInfoListeners$lis[1];

    connection.removeEventListener(eventTypesMap[type], wrappedHandler);
    netInfoListeners.splice(listenerIndex, 1);
  },
  fetch: function fetch() {
    console.warn('`fetch` is deprecated. Use `getConnectionInfo` instead.');
    return new Promise(function (resolve, reject) {
      try {
        resolve(connection.type);
      } catch (err) {
        resolve('unknown');
      }
    });
  },
  getConnectionInfo: function getConnectionInfo() {
    return new Promise(function (resolve, reject) {
      resolve(getConnectionInfoObject());
    });
  },


  isConnected: {
    addEventListener: function addEventListener(type, handler) {
      (0, _invariant2.default)(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
      if (type === 'change') {
        console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
      }

      var onlineCallback = function onlineCallback() {
        return handler(true);
      };
      var offlineCallback = function offlineCallback() {
        return handler(false);
      };
      connectionListeners.push([handler, onlineCallback, offlineCallback]);

      window.addEventListener('online', onlineCallback, false);
      window.addEventListener('offline', offlineCallback, false);

      return {
        remove: function remove() {
          return NetInfo.isConnected.removeEventListener(eventTypesMap[type], handler);
        }
      };
    },
    removeEventListener: function removeEventListener(type, handler) {
      (0, _invariant2.default)(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
      if (type === 'change') {
        console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
      }

      var listenerIndex = (0, _arrayFindIndex2.default)(connectionListeners, function (pair) {
        return pair[0] === handler;
      });
      (0, _invariant2.default)(listenerIndex !== -1, 'Trying to remove NetInfo connection listener for unregistered handler');
      var _connectionListeners$ = connectionListeners[listenerIndex],
          onlineCallback = _connectionListeners$[1],
          offlineCallback = _connectionListeners$[2];


      window.removeEventListener('online', onlineCallback, false);
      window.removeEventListener('offline', offlineCallback, false);

      connectionListeners.splice(listenerIndex, 1);
    },
    fetch: function fetch() {
      console.warn('`fetch` is deprecated. Use `getConnectionInfo` instead.');
      return NetInfo.isConnected.getConnectionInfo();
    },
    getConnectionInfo: function getConnectionInfo() {
      return new Promise(function (resolve, reject) {
        try {
          resolve(window.navigator.onLine);
        } catch (err) {
          resolve(true);
        }
      });
    }
  }
};

exports.default = NetInfo;