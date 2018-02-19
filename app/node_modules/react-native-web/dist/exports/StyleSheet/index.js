'use strict';

exports.__esModule = true;

var _modality = require('../../modules/modality');

var _modality2 = _interopRequireDefault(_modality);

var _StyleSheet = require('./StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize focus-ring fix
(0, _modality2.default)();

// allow component styles to be editable in React Dev Tools
if (process.env.NODE_ENV !== 'production') {
  var _require = require('fbjs/lib/ExecutionEnvironment'),
      canUseDOM = _require.canUseDOM;

  if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = _StyleSheet2.default.flatten;
  }
}

exports.default = _StyleSheet2.default;