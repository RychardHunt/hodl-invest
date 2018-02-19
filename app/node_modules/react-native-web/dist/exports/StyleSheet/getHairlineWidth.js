'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var getHairlineWidth = function getHairlineWidth() {
  var hairlineWidth = 1;
  if (_ExecutionEnvironment.canUseDOM && window.devicePixelRatio && window.devicePixelRatio >= 2) {
    var body = document.body;
    if (body) {
      var node = document.createElement('div');
      node.style.border = '.5px solid transparent';
      body.appendChild(node);
      if (node.offsetHeight === 1) {
        hairlineWidth = 0.5;
      }
      body.removeChild(node);
    }
  }
  return hairlineWidth;
}; /**
    * Based on http://dieulot.net/css-retina-hairline
    * @noflow
    */

exports.default = getHairlineWidth;