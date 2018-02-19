'use strict';

var _normalizeNativeEvent = require('../normalizeNativeEvent');

var _normalizeNativeEvent2 = _interopRequireDefault(_normalizeNativeEvent);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _unstableNativeDependencies = require('react-dom/unstable-native-dependencies');

var _unstableNativeDependencies2 = _interopRequireDefault(_unstableNativeDependencies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventPluginHub = _reactDom2.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.EventPluginHub; // based on https://github.com/facebook/react/pull/4303/files

var ResponderEventPlugin = _unstableNativeDependencies2.default.ResponderEventPlugin,
    ResponderTouchHistoryStore = _unstableNativeDependencies2.default.ResponderTouchHistoryStore;


var topMouseDown = 'topMouseDown';
var topMouseMove = 'topMouseMove';
var topMouseUp = 'topMouseUp';
var topScroll = 'topScroll';
var topSelectionChange = 'topSelectionChange';
var topTouchCancel = 'topTouchCancel';
var topTouchEnd = 'topTouchEnd';
var topTouchMove = 'topTouchMove';
var topTouchStart = 'topTouchStart';

var endDependencies = [topTouchCancel, topTouchEnd, topMouseUp];
var moveDependencies = [topTouchMove, topMouseMove];
var startDependencies = [topTouchStart, topMouseDown];

/**
 * Setup ResponderEventPlugin dependencies
 */
ResponderEventPlugin.eventTypes.responderMove.dependencies = moveDependencies;
ResponderEventPlugin.eventTypes.responderEnd.dependencies = endDependencies;
ResponderEventPlugin.eventTypes.responderStart.dependencies = startDependencies;
ResponderEventPlugin.eventTypes.responderRelease.dependencies = endDependencies;
ResponderEventPlugin.eventTypes.responderTerminationRequest.dependencies = [];
ResponderEventPlugin.eventTypes.responderGrant.dependencies = [];
ResponderEventPlugin.eventTypes.responderReject.dependencies = [];
ResponderEventPlugin.eventTypes.responderTerminate.dependencies = [];
ResponderEventPlugin.eventTypes.moveShouldSetResponder.dependencies = moveDependencies;
ResponderEventPlugin.eventTypes.selectionChangeShouldSetResponder.dependencies = [topSelectionChange];
ResponderEventPlugin.eventTypes.scrollShouldSetResponder.dependencies = [topScroll];
ResponderEventPlugin.eventTypes.startShouldSetResponder.dependencies = startDependencies;

var originalRecordTouchTrack = ResponderTouchHistoryStore.recordTouchTrack;

ResponderTouchHistoryStore.recordTouchTrack = function (topLevelType, nativeEvent) {
  // Filter out mouse-move events when the mouse button is not down
  if (topLevelType === topMouseMove && !ResponderTouchHistoryStore.touchHistory.touchBank.length) {
    return;
  }

  var normalizedEvent = (0, _normalizeNativeEvent2.default)(nativeEvent);
  originalRecordTouchTrack.call(ResponderTouchHistoryStore, topLevelType, normalizedEvent);
};

EventPluginHub.injection.injectEventPluginsByName({
  ResponderEventPlugin: ResponderEventPlugin
});