'use strict';

exports.__esModule = true;

var _requestAnimationFrame = require('fbjs/lib/requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _setImmediate = require('fbjs/lib/setImmediate');

var _setImmediate2 = _interopRequireDefault(_setImmediate);

var _setValueForStyles = require('../../vendor/setValueForStyles');

var _setValueForStyles2 = _interopRequireDefault(_setValueForStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRect = function getRect(node) {
  var height = node.offsetHeight;
  var width = node.offsetWidth;
  var left = 0;
  var top = 0;
  while (node && node.nodeType === 1 /* Node.ELEMENT_NODE */) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent;
  }
  return { height: height, left: left, top: top, width: width };
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @providesModule UIManager
    * @noflow
    */

var hasRequestedAnimationFrame = false;
var measureLayoutQueue = [];

var processLayoutQueue = function processLayoutQueue() {
  measureLayoutQueue.splice(0, 250).forEach(function (item) {
    var node = item[0],
        relativeToNativeNode = item[1],
        callback = item[2];

    var relativeNode = relativeToNativeNode || node && node.parentNode;

    if (node && relativeNode) {
      var relativeRect = getRect(relativeNode);

      var _getRect = getRect(node),
          height = _getRect.height,
          left = _getRect.left,
          top = _getRect.top,
          width = _getRect.width;

      var x = left - relativeRect.left;
      var y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }
  });

  if (measureLayoutQueue.length > 0) {
    (0, _setImmediate2.default)(processLayoutQueue);
  }
};

var _measureLayout = function _measureLayout(node, relativeToNativeNode, callback) {
  if (!hasRequestedAnimationFrame) {
    (0, _requestAnimationFrame2.default)(function () {
      hasRequestedAnimationFrame = false;
      processLayoutQueue();
    });
  }

  hasRequestedAnimationFrame = true;
  measureLayoutQueue.push([node, relativeToNativeNode, callback]);
};

var UIManager = {
  blur: function blur(node) {
    try {
      node.blur();
    } catch (err) {}
  },
  focus: function focus(node) {
    try {
      node.focus();
    } catch (err) {}
  },
  measure: function measure(node, callback) {
    _measureLayout(node, null, callback);
  },
  measureInWindow: function measureInWindow(node, callback) {
    (0, _requestAnimationFrame2.default)(function () {
      if (node) {
        var _getRect2 = getRect(node),
            height = _getRect2.height,
            left = _getRect2.left,
            top = _getRect2.top,
            width = _getRect2.width;

        callback(left, top, width, height);
      }
    });
  },
  measureLayout: function measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    _measureLayout(node, relativeToNativeNode, onSuccess);
  },
  updateView: function updateView(node, props, component /* only needed to surpress React errors in development */) {
    for (var prop in props) {
      if (!Object.prototype.hasOwnProperty.call(props, prop)) {
        continue;
      }

      var value = props[prop];
      switch (prop) {
        case 'style':
          {
            (0, _setValueForStyles2.default)(node, value, component._reactInternalInstance);
            break;
          }
        case 'class':
        case 'className':
          {
            node.setAttribute('class', value);
            break;
          }
        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          node.value = value;
          break;
        default:
          node.setAttribute(prop, value);
      }
    }
  }
};

exports.default = UIManager;