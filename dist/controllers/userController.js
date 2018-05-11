'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _token = require('../helper/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

/**
 * @class userController
 *
 * @export
 *
 */

var userController = function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: 'registerUser',

    /**
       * @description - Creates a new user
       * @static
       *
       * @param {object} req - HTTP Request
       * @param {object} res - HTTP Response
       *
       * @memberof userController
       *
       * @returns {object} Class instance
       */
    value: function registerUser(req, res) {
      var password = _bcrypt2.default.hashSync(req.body.password.trim(), 10);
      var _req$body = req.body,
          name = _req$body.name,
          email = _req$body.email,
          role = _req$body.role;


      User.findOne({
        where: {
          email: email
        }
      }).then(function (existingEmail) {
        console.log('>>>>>>>>>>>', existingEmail);
        if (existingEmail) {
          return res.status(409).json({
            status: 'fail',
            message: 'Email already exist'
          });
        }
        return User.create({
          name: name,
          email: email,
          password: password,
          role: role
        }).then(function (newUser) {
          var token = (0, _token2.default)(newUser);
          return res.status(201).json({
            status: 'success',
            message: 'signup sucessful',
            user: {
              email: newUser.email,
              id: newUser.id
            },
            token: token
          });
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error',
          error: error
        });
      });
    }

    /**
       * @description - Login a user
       * @static
       *
       * @param {object} req - HTTP Request
       * @param {object} res - HTTP Response
       *
       * @memberof userController
       *
       * @returns {object} Class instance
       */

  }, {
    key: 'loginUser',
    value: function loginUser(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      User.findOne({
        where: {
          email: email
        }
      }).then(function (foundUser) {
        if (!foundUser) {
          return res.status(404).json({
            status: 'fail',
            message: 'user does not exist'
          });
        }
        var validPassword = _bcrypt2.default.compareSync(password.trim(), foundUser.password);
        if (!validPassword) {
          return res.status(401).json({
            status: 'fail',
            message: 'You entered a wrong password'
          });
        }
        var token = (0, _token2.default)(foundUser);
        return res.status(200).json({
          status: 'success',
          token: token,
          foundUser: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role

          }
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error',
          error: error
        });
      });
    }
  }]);

  return userController;
}();

exports.default = userController;