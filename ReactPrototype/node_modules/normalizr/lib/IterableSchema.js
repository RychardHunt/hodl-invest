'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashLangIsObject = require('lodash/lang/isObject');

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var ArraySchema = (function () {
  function ArraySchema(itemSchema) {
    var _this = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, ArraySchema);

    if (!_lodashLangIsObject2['default'](itemSchema)) {
      throw new Error('ArraySchema requires item schema to be an object.');
    }

    this._itemSchema = itemSchema;

    if (options.schemaAttribute) {
      (function () {
        var schemaAttribute = options.schemaAttribute;
        _this._getSchema = typeof schemaAttribute === 'function' ? schemaAttribute : function (x) {
          return x[schemaAttribute];
        };
      })();
    }
  }

  ArraySchema.prototype.getItemSchema = function getItemSchema() {
    return this._itemSchema;
  };

  ArraySchema.prototype.isPolymorphicSchema = function isPolymorphicSchema() {
    return !!this._getSchema;
  };

  ArraySchema.prototype.getSchemaKey = function getSchemaKey(item) {
    return this._getSchema(item);
  };

  return ArraySchema;
})();

exports['default'] = ArraySchema;
module.exports = exports['default'];