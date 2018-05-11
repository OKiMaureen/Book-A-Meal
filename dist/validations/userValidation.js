'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserLength = exports.validateSignup = exports.validateSignin = undefined;

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateSignin = exports.validateSignin = function validateSignin(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  var error = {};
  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !_validator2.default.isEmail(email.trim() || '')) {
    error.email = 'Please provide a valid email address';
  }
  if (!password) {
    error.password = 'Password is required';
  }

  if (password && _validator2.default.isEmpty(password.trim() || '')) {
    error.password = 'Password is required';
  }

  if ((0, _lodash2.default)(error)) return next();
  return res.status(400).json({ error: error });
};

var validateSignup = exports.validateSignup = function validateSignup(req, res, next) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password,
      name = _req$body2.name;

  var error = {};
  if (!name) {
    error.name = 'Name is required';
  }

  if (name && _validator2.default.isEmpty(name.trim() || '')) {
    error.name = 'Name is required';
  }
  if (!password) {
    error.password = 'Password is required';
  }

  if (password && _validator2.default.isEmpty(password.trim() || '')) {
    error.password = 'Password is required';
  }
  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !_validator2.default.isEmail(email.trim() || '')) {
    error.email = 'Email address is empty or invalid';
  }

  if ((0, _lodash2.default)(error)) return next();
  return res.status(400).json({ error: error });
};

var validateUserLength = exports.validateUserLength = function validateUserLength(req, res, next) {
  var password = req.body.password;
  // Check for Password

  if (!_validator2.default.isLength(password, { min: 6, max: 50 })) {
    return res.status(406).send({
      status: 'Fail',
      message: 'Password can only be from 6 to 50 characters'
    });
  }
  next();
};