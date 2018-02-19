'use strict';

exports.__esModule = true;

var _createKeyframesRules2 = require('./createKeyframesRules');

var _createKeyframesRules3 = _interopRequireDefault(_createKeyframesRules2);

var _createRuleBlock7 = require('./createRuleBlock');

var _createRuleBlock8 = _interopRequireDefault(_createRuleBlock7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAtomicRules = function createAtomicRules(selector, prop, value) {
  var rules = [];

  // Handle custom properties and custom values that require additional rules
  // to be created.
  switch (prop) {
    // See #513
    case 'pointerEvents':
      {
        var _createRuleBlock3;

        var val = value;
        if (value === 'auto' || value === 'box-only') {
          val = 'auto !important';
          if (value === 'box-only') {
            var _createRuleBlock;

            var _block = (0, _createRuleBlock8.default)((_createRuleBlock = {}, _createRuleBlock[prop] = 'none', _createRuleBlock));
            rules.push(selector + ' > *{' + _block + '}');
          }
        } else if (value === 'none' || value === 'box-none') {
          val = 'none !important';
          if (value === 'box-none') {
            var _createRuleBlock2;

            var _block2 = (0, _createRuleBlock8.default)((_createRuleBlock2 = {}, _createRuleBlock2[prop] = 'auto', _createRuleBlock2));
            rules.push(selector + ' > *{' + _block2 + '}');
          }
        }
        var block = (0, _createRuleBlock8.default)((_createRuleBlock3 = {}, _createRuleBlock3[prop] = val, _createRuleBlock3));
        rules.push(selector + '{' + block + '}');
        break;
      }

    case 'placeholderTextColor':
      {
        var _block3 = (0, _createRuleBlock8.default)({ color: value, opacity: 1 });
        rules.push('@media all {' + (selector + '::-webkit-input-placeholder{' + _block3 + '}') + (selector + '::-moz-placeholder{' + _block3 + '}') + (selector + ':-ms-input-placeholder{' + _block3 + '}') + (selector + '::placeholder{' + _block3 + '}') + '}');
        break;
      }

    case 'animationName':
      {
        if (typeof value === 'string') {
          var _createRuleBlock4;

          // add a className referencing the animation
          var _block4 = (0, _createRuleBlock8.default)((_createRuleBlock4 = {}, _createRuleBlock4[prop] = value, _createRuleBlock4));
          rules.push(selector + '{' + _block4 + '}');
        } else {
          var _createRuleBlock5;

          var animationNames = [];

          // add the keyframes needed to implement each value
          value.forEach(function (keyframes) {
            if (typeof keyframes === 'string') {
              animationNames.push(keyframes);
            } else {
              var _createKeyframesRules = (0, _createKeyframesRules3.default)(keyframes),
                  identifier = _createKeyframesRules.identifier,
                  keyframesRules = _createKeyframesRules.rules;

              keyframesRules.forEach(function (rule) {
                rules.push(rule);
              });
              animationNames.push(identifier);
            }
          });

          // add a className referencing the animation identifiers
          var _block5 = (0, _createRuleBlock8.default)((_createRuleBlock5 = {}, _createRuleBlock5[prop] = animationNames.join(','), _createRuleBlock5));
          rules.push(selector + '{' + _block5 + '}');
        }

        break;
      }

    default:
      {
        var _createRuleBlock6;

        var _block6 = (0, _createRuleBlock8.default)((_createRuleBlock6 = {}, _createRuleBlock6[prop] = value, _createRuleBlock6));
        rules.push(selector + '{' + _block6 + '}');
      }
  }

  return rules;
};

exports.default = createAtomicRules;