'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = exports.validateMeals = undefined;

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateMeals = exports.validateMeals = function validateMeals(req, res, next) {
  var _req$body = req.body,
      category = _req$body.category,
      name = _req$body.name,
      price = _req$body.price;

  var error = {};
  if (!category) {
    error.category = 'category is required';
  }

  if (category && !_validator2.default.isEmpty(category.trim() || '')) {
    error.category = 'category';
  }
  if (!name) {
    error.password = 'ame is required';
  }

  if (name && _validator2.default.isEmpty(name.trim() || '')) {
    error.ame = 'meal name is required';
  }
  if (!price) {
    error.price = 'price is required';
  }
  if (price && _validator2.default.isEmpty(price.trim() || '')) {
    error.price = 'price is required';
  }
  if ((0, _lodash2.default)(error)) return next();
  return res.status(400).json({ error: error });
};
var isNumber = exports.isNumber = function isNumber(req, res, next) {
  var price = req.body.price;

  var error = {};
  if (!price) {
    error.price = 'price is required';
  }
  if (price && _validator2.default.isEmpty(price.trim() || '')) {
    error.price = 'price is required';
  }
  // check if price is a number
  if (Number.isNaN(parseInt(price, 10))) {
    error.price = 'price must be a number';
  }
  if ((0, _lodash2.default)(error)) return next();
  return res.status(400).json({ error: error });
};