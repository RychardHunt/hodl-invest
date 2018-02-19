'use strict';

exports.__esModule = true;

var _AnimatedImplementation = require('../../vendor/Animated/AnimatedImplementation');

var _AnimatedImplementation2 = _interopRequireDefault(_AnimatedImplementation);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

var _ScrollView = require('../ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _Text = require('../Text');

var _Text2 = _interopRequireDefault(_Text);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Animated = Object.assign({}, _AnimatedImplementation2.default, {
  Image: _AnimatedImplementation2.default.createAnimatedComponent(_Image2.default),
  ScrollView: _AnimatedImplementation2.default.createAnimatedComponent(_ScrollView2.default),
  View: _AnimatedImplementation2.default.createAnimatedComponent(_View2.default),
  Text: _AnimatedImplementation2.default.createAnimatedComponent(_Text2.default)
}); /**
     * Copyright (c) 2016-present, Nicolas Gallagher.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * @providesModule Animated
     * 
     */

exports.default = Animated;