'use strict';

exports.__esModule = true;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InteractionManager = {
  Events: {
    interactionStart: 'interactionStart',
    interactionComplete: 'interactionComplete'
  },

  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions: function runAfterInteractions(callback) {
    (0, _invariant2.default)(typeof callback === 'function', 'Must specify a function to schedule.');
    callback();
  },


  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle: function createInteractionHandle() {
    return 1;
  },


  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle: function clearInteractionHandle(handle) {
    (0, _invariant2.default)(!!handle, 'Must provide a handle to clear.');
  },


  addListener: function addListener() {}
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * Copyright (c) 2015-present, Facebook, Inc.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @providesModule InteractionManager
    * 
    */

exports.default = InteractionManager;