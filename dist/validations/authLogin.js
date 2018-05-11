'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateAdmin = exports.authenticateUser = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;


_dotenv2.default.config();
var secretKey = process.env.JWT_SECRET;

/**
   * @description - Checks if logged in user has valid AUTH token
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {null} - null
   */
var authenticateUser = exports.authenticateUser = function authenticateUser(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers.token || req.query.token;

  try {
    var verifiedToken = _jsonwebtoken2.default.verify(token, secretKey);
    req.decoded = verifiedToken;
    User.findOne({
      where: { id: req.decoded.id }
    }).then(function (user) {
      if (!user) {
        return res.status(400).send('no user found');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'access denied',
      error: error
    });
  }
};

var authenticateAdmin = exports.authenticateAdmin = function authenticateAdmin(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers.token || req.query.token;
  try {
    var verifiedToken = _jsonwebtoken2.default.verify(token, secretKey);
    req.decoded = verifiedToken;
    User.findOne({
      where: { id: req.decoded.id }
    }).then(function (user) {
      if (!user) {
        return res.status(400).send('no user');
      }
      req.user = user;
      var role = req.user.role;

      if (role !== 'admin') {
        return res.status(401).send();
      }
      next();
    });
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'access denied',
      error: error
    });
  }
};