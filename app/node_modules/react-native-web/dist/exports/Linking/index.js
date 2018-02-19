'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var initialURL = _ExecutionEnvironment.canUseDOM ? window.location.href : ''; /**
                                                                               * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                               * Copyright (c) 2015-present, Facebook, Inc.
                                                                               * All rights reserved.
                                                                               *
                                                                               * This source code is licensed under the BSD-style license found in the
                                                                               * LICENSE file in the root directory of this source tree.
                                                                               *
                                                                               * @providesModule Linking
                                                                               * 
                                                                               */

var Linking = {
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  canOpenURL: function canOpenURL() {
    return Promise.resolve(true);
  },
  getInitialURL: function getInitialURL() {
    return Promise.resolve(initialURL);
  },
  openURL: function openURL(url) {
    try {
      iframeOpen(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

/**
 * Tabs opened using JavaScript may redirect the parent tab using
 * `window.opener.location`, ignoring cross-origin restrictions and enabling
 * phishing attacks.
 *
 * Safari requires that we open the url by injecting a hidden iframe that calls
 * window.open(), then removes the iframe from the DOM.
 *
 * https://mathiasbynens.github.io/rel-noopener/
 */
var iframeOpen = function iframeOpen(url) {
  var noOpener = url.indexOf('mailto:') !== 0;
  var body = document.body;
  if (body) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    body.appendChild(iframe);

    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    var iframeBody = iframeDoc.body;
    if (iframeBody) {
      var script = iframeDoc.createElement('script');
      var openerExpression = noOpener ? 'child.opener = null' : '';
      script.text = '\n        window.parent = null; window.top = null; window.frameElement = null;\n        var child = window.open("' + url + '"); ' + openerExpression + ';\n      ';
      iframeBody.appendChild(script);
    }
    body.removeChild(iframe);
  }
};

exports.default = Linking;