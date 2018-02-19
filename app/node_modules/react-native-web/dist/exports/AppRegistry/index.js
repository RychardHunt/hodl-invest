'use strict';

exports.__esModule = true;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _unmountComponentAtNode = require('../unmountComponentAtNode');

var _unmountComponentAtNode2 = _interopRequireDefault(_unmountComponentAtNode);

var _renderApplication = require('./renderApplication');

var _renderApplication2 = _interopRequireDefault(_renderApplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright (c) 2015-present, Nicolas Gallagher.
                                                                                                                                                           * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                           * All rights reserved.
                                                                                                                                                           *
                                                                                                                                                           * This source code is licensed under the BSD-style license found in the
                                                                                                                                                           * LICENSE file in the root directory of this source tree.
                                                                                                                                                           *
                                                                                                                                                           * @providesModule AppRegistry
                                                                                                                                                           * 
                                                                                                                                                           */

var emptyObject = {};
var runnables = {};

/**
 * `AppRegistry` is the JS entry point to running all React Native apps.
 */
var AppRegistry = function () {
  function AppRegistry() {
    _classCallCheck(this, AppRegistry);
  }

  AppRegistry.getAppKeys = function getAppKeys() {
    return Object.keys(runnables);
  };

  AppRegistry.getApplication = function getApplication(appKey, appParameters) {
    (0, _invariant2.default)(runnables[appKey] && runnables[appKey].getApplication, 'Application ' + appKey + ' has not been registered. ' + 'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');

    return runnables[appKey].getApplication(appParameters);
  };

  AppRegistry.registerComponent = function registerComponent(appKey, getComponentFunc) {
    runnables[appKey] = {
      getApplication: function getApplication() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject,
            initialProps = _ref.initialProps;

        return (0, _renderApplication.getApplication)(getComponentFunc(), initialProps);
      },
      run: function run(_ref2) {
        var _ref2$initialProps = _ref2.initialProps,
            initialProps = _ref2$initialProps === undefined ? emptyObject : _ref2$initialProps,
            rootTag = _ref2.rootTag;
        return (0, _renderApplication2.default)(getComponentFunc(), initialProps, rootTag);
      }
    };
    return appKey;
  };

  AppRegistry.registerConfig = function registerConfig(config) {
    config.forEach(function (_ref3) {
      var appKey = _ref3.appKey,
          component = _ref3.component,
          run = _ref3.run;

      if (run) {
        AppRegistry.registerRunnable(appKey, run);
      } else {
        (0, _invariant2.default)(component, 'No component provider passed in');
        AppRegistry.registerComponent(appKey, component);
      }
    });
  };

  // TODO: fix style sheet creation when using this method


  AppRegistry.registerRunnable = function registerRunnable(appKey, run) {
    runnables[appKey] = { run: run };
    return appKey;
  };

  AppRegistry.runApplication = function runApplication(appKey, appParameters) {
    var isDevelopment = process.env.NODE_ENV !== 'production';
    var params = Object.assign({}, appParameters);
    params.rootTag = '#' + params.rootTag.id;

    console.log('Running application "' + appKey + '" with appParams: ' + JSON.stringify(params) + '. ' + ('development-level warnings are ' + (isDevelopment ? 'ON' : 'OFF') + ', ') + ('performance optimizations are ' + (isDevelopment ? 'OFF' : 'ON')));

    (0, _invariant2.default)(runnables[appKey] && runnables[appKey].run, 'Application "' + appKey + '" has not been registered. ' + 'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');

    runnables[appKey].run(appParameters);
  };

  AppRegistry.unmountApplicationComponentAtRootTag = function unmountApplicationComponentAtRootTag(rootTag) {
    (0, _unmountComponentAtNode2.default)(rootTag);
  };

  return AppRegistry;
}();

exports.default = AppRegistry;