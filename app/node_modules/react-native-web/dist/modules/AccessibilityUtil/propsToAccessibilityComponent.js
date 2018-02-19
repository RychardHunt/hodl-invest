'use strict';

exports.__esModule = true;

var _propsToAriaRole = require('./propsToAriaRole');

var _propsToAriaRole2 = _interopRequireDefault(_propsToAriaRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roleComponents = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
}; /**
    * Copyright (c) 2017-present, Nicolas Gallagher.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * 
    */

var emptyObject = {};

var propsToAccessibilityComponent = function propsToAccessibilityComponent() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;

  var role = (0, _propsToAriaRole2.default)(props);
  if (role) {
    if (role === 'heading') {
      var level = props['aria-level'] || 1;
      return 'h' + level;
    }
    return roleComponents[role];
  }
};

exports.default = propsToAccessibilityComponent;