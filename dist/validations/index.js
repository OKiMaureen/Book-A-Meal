'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyMealNumber = exports.verifyMealLength = exports.mealValidator = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mealValidator = exports.mealValidator = function mealValidator(req, res, next) {
  var _req$body = req.body,
      category = _req$body.category,
      name = _req$body.name,
      price = _req$body.price;

  var error = {};
  // check if category is empty
  if (!category || category === undefined) {
    error.category = 'category is required';
  }
  if (category && _validator2.default.isEmpty(category)) {
    error.category = 'category is required';
  }
  // check if meal name is empty
  if (!name || name === undefined || name === ' ') {
    error.name = 'name is required';
  }
  if (name && _validator2.default.isEmpty(name)) {
    error.name = 'name is required';
  }
  // check if price is empty
  if (!price || price.length === 0) {
    error.price = 'price is required';
  }
  if (price && _validator2.default.isEmpty(price)) {
    error.price = 'price is required';
  }
  if ((0, _lodash2.default)(error)) return next();
  return res.status(400).json({
    error: error
  });
};

// check for name of meal length
var verifyMealLength = exports.verifyMealLength = function verifyMealLength(req, res, next) {
  var name = req.body.name;

  if (!_validator2.default.isLength(name, { min: 3, max: 15 })) {
    return res.status(406).send({
      status: 'Fail',
      message: 'meal name must be between 3 to 15 characters'
    });
  }

  next();
};
var verifyMealNumber = exports.verifyMealNumber = function verifyMealNumber(req, res, next) {
  var price = req.body.price;

  var error = {};

  if (Number.isNaN(parseInt(price, 10))) {
    error.price = 'price must be a number';
  }
  if ((0, _lodash2.default)(error)) return next();
  return res.status(400).json({
    error: error
  });
};