'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Meal = _models2.default.Meal;

/**
 * @class mealController
 *
 * @export
 *
 */

var mealController = function () {
  function mealController() {
    _classCallCheck(this, mealController);
  }

  _createClass(mealController, null, [{
    key: 'addMeal',

    /**
     * @description - Add a new meal
     * @static
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     *
     * @memberof mealController
     *
     * @returns {object} Class instance
     */
    value: function addMeal(req, res) {
      var _req$body = req.body,
          category = _req$body.category,
          name = _req$body.name,
          price = _req$body.price,
          image = _req$body.image;


      Meal.findOne({
        where: {
          name: name
        }
      }).then(function (existingMeal) {
        if (existingMeal) {
          return res.status(400).json({
            status: 'fail',
            message: 'this meal already exists'
          });
        }
        return Meal.create({
          category: category,
          name: name,
          price: price,
          image: image,
          userId: req.user.id
        }).then(function (newMeal) {
          var mealDetails = (0, _lodash2.default)(newMeal, ['category', 'name', 'price', 'image']);
          res.status(201).json({
            status: 'success',
            message: 'Meal created successfully',
            meal: mealDetails
          });
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 'error',
          message: 'internal server error',
          error: error
        });
      });
    }
    /**
     * @description - get all meals
     * @static
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     *
     * @memberof mealController
     *
     * @returns {object} Class instance
     */

  }, {
    key: 'getAllMeals',
    value: function getAllMeals(req, res) {
      return Meal.findAll().then(function (foundMeal) {
        return res.status(200).json({
          status: true,
          meal: foundMeal
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 'error',
          message: 'internal server error',
          error: error
        });
      });
    }
    /**
     * @description - Update a meal
     * @static
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     *
     * @memberof mealController
     *
     * @returns {object} Class instance
     */

  }, {
    key: 'updateMeal',
    value: function updateMeal(req, res) {
      Meal.findOne({
        where: {
          name: req.body.name
        }
      }).then(function (existingMeal) {
        if (existingMeal) {
          return res.status(400).json({
            status: false,
            message: 'The meal name already exists'
          });
        }
        return Meal.findOne({
          where: {
            id: req.params.id
          }
        }).then(function (foundMeal) {
          if (!foundMeal) {
            res.status(404).json({
              status: false,
              message: 'Meal id  ' + req.params.id + ' not found'
            });
          }
          return foundMeal.update({
            category: req.body.category || Meal.category,
            name: req.body.name || Meal.name,
            price: req.body.price || Meal.price,
            image: req.body.image || Meal.image

          });
        }).then(function (updatedMeal) {
          var mealDetails = (0, _lodash2.default)(updatedMeal, ['category', 'name', 'price', 'image']);
          res.status(201).json({
            status: true,
            message: 'Meal updated successfully',
            meal: mealDetails
          });
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 'error',
          message: 'internal server error',
          error: error
        });
      });
    }
    /**
    * @description - Delete an Meal
    * @static
    *
    * @param {object} req - HTTP Request
    * @param {object} res - HTTP Response
    *
    * @memberof mealController
    *
    * @returns {object} Class instance
    */

  }, {
    key: 'deleteMeal',
    value: function deleteMeal(req, res) {
      Meal.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (foundMeal) {
        if (!foundMeal) {
          return res.status(404).json({
            status: 'fail',
            message: 'Can\'t find meal with id ' + req.params.id + ' '
          });
        }
        if (foundMeal) {
          foundMeal.destroy({
            where: {
              id: req.params.id
            }
          }).then(function () {
            return res.status(200).json({
              status: true,
              message: 'Meal with ' + req.params.id + ' deleted'
            });
          });
        }
      }).catch(function (error) {
        return res.status(500).json({
          status: 'error',
          message: 'internal server error',
          error: error
        });
      });
    }
  }]);

  return mealController;
}();

exports.default = mealController;