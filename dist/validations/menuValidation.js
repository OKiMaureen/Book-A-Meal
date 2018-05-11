'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMeals = undefined;

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateMeals = exports.validateMeals = function validateMeals(req, res, next) {
  var _req$body = req.body,
      menuName = _req$body.menuName,
      date = _req$body.date,
      mealId = _req$body.mealId;

  var error = {};
  if (!menuName) {
    error.menuName = 'menu name is required';
  }

  if (menuName && !_validator2.default.isEmpty(menuName.trim() || '')) {
    error.menuName = 'menu name is required';
  }
  if (!date) {
    error.date = 'date is required';
  }

  if (date && _validator2.default.isEmpty(date.trim() || '')) {
    error.date = 'date is required';
  }
  if (!mealId) {
    error.mealId = 'mealId is required';
  }
  if (mealId && _validator2.default.isEmpty(mealId.trim() || '')) {
    error.price = 'price is required';
  }

  if ((0, _lodash2.default)(error)) return next();
  return res.status(400).json({ error: error });
};
var validate = new _validator2.default();

exports.default = validate;