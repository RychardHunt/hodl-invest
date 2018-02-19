'use strict';

exports.__esModule = true;

var _createRuleBlock = require('./createRuleBlock');

var _createRuleBlock2 = _interopRequireDefault(_createRuleBlock);

var _createReactDOMStyle = require('./createReactDOMStyle');

var _createReactDOMStyle2 = _interopRequireDefault(_createReactDOMStyle);

var _i18nStyle = require('./i18nStyle');

var _i18nStyle2 = _interopRequireDefault(_i18nStyle);

var _hash = require('../../vendor/hash');

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashObject = function hashObject(obj) {
  return (0, _hash2.default)(JSON.stringify(obj));
};

var createIdentifier = function createIdentifier(obj) {
  var hashed = hashObject(obj);
  return process.env.NODE_ENV !== 'production' ? 'rn-anim-' + hashed : 'rn-' + hashed;
};

var prefixes = ['-webkit-', ''];

var makeBlock = function makeBlock(rule) {
  var domStyle = (0, _createReactDOMStyle2.default)((0, _i18nStyle2.default)(rule));
  return (0, _createRuleBlock2.default)(domStyle);
};

var makeSteps = function makeSteps(keyframes) {
  return Object.keys(keyframes).map(function (stepName) {
    var rule = keyframes[stepName];
    var block = makeBlock(rule);
    return stepName + '{' + block + '}';
  }).join('');
};

var createKeyframesRules = function createKeyframesRules(keyframes) {
  var identifier = createIdentifier(keyframes);
  var rules = prefixes.map(function (prefix) {
    return '@media all {@' + prefix + 'keyframes ' + identifier + '{' + makeSteps(keyframes) + '}}';
  });
  return { identifier: identifier, rules: rules };
};

exports.default = createKeyframesRules;