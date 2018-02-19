'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactNativePropRegistry
 * 
 */

var emptyObject = {};
var objects = {};
var prefix = 'r';
var uniqueID = 1;

var createKey = function createKey(id) {
  return prefix + '-' + id;
};

var ReactNativePropRegistry = function () {
  function ReactNativePropRegistry() {
    _classCallCheck(this, ReactNativePropRegistry);
  }

  ReactNativePropRegistry.register = function register(object) {
    var id = uniqueID++;
    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(object);
    }
    var key = createKey(id);
    objects[key] = object;
    return id;
  };

  ReactNativePropRegistry.getByID = function getByID(id) {
    if (!id) {
      // Used in the style={[condition && id]} pattern,
      // we want it to be a no-op when the value is false or null
      return emptyObject;
    }
    var key = createKey(id);
    var object = objects[key];
    if (!object) {
      console.warn('Invalid style with id `' + id + '`. Skipping ...');
      return emptyObject;
    }
    return object;
  };

  return ReactNativePropRegistry;
}();

exports.default = ReactNativePropRegistry;