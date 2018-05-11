'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class Menu controls all menu methods
 * @class Menu
 */
var menuController = function () {
  function menuController() {
    _classCallCheck(this, menuController);
  }

  _createClass(menuController, null, [{
    key: 'addMenu',

    /**
     * POST a new menu
     * @param {any} req
     * @param {any} res
     * @returns {json} adds new menu
     * @memberof Menu
     */
    value: function addMenu(req, res) {
      var _req$body = req.body,
          menuName = _req$body.menuName,
          mealId = _req$body.mealId,
          date = _req$body.date;

      _models.Menu.findOne({
        where: {
          date: (0, _moment2.default)()
        }
      }).then(function (menu) {
        if (menu) {
          return res.status(409).json({
            error: 'menu for the day already exists'
          });
        }
        _models.Meal.findAll({
          attributes: ['id']
        }).then(function (meals) {
          if (!meals) {
            return res.status(404).json({ error: 'No meal was found' });
          }
          var foundMeal = meals.map(function (meal) {
            return meal.id;
          });
          var mealNotFound = req.body.mealId.filter(function (id) {
            return foundMeal.indexOf(parseInt(id, 10)) === -1;
          });
          if (mealNotFound.length >= 1) {
            return res.status(404).json({
              message: 'Cannot set menu, These meals Ids were not found',
              meals: mealNotFound.join(',')
            });
          }
          _models.Menu.create({
            menuName: menuName,
            date: date,
            userId: req.user.id
          }).then(function (newMenu) {
            newMenu.setMeals(mealId);
            res.status(201).json({
              status: true,
              message: 'menu added successfully'
            });
          }).catch(function (error) {
            return res.status(500).json({
              status: 'error',
              message: 'internal server error',
              error: error
            });
          });
        });
      });
    }

    /**
     * GET menu menu
     * @param {any} req
     * @param {any} res
     * @returns {json} gets menu
     * @memberof Menu
    */

  }, {
    key: 'getMenu',
    value: function getMenu(req, res) {
      _models.Menu.find({
        where: {
          date: (0, _moment2.default)()
        },
        include: [{
          model: _models.Meal
        }]
      }).then(function (menu) {
        menu.getMeals({
          attributes: ['category', 'name', 'price', 'image']
        }).then(function (foundMenu) {
          return res.status(200).json({
            status: true,
            message: 'menu gotten successfully',
            menu: foundMenu
          });
        });
        if (!menu) {
          return res.status(404).json({
            status: false,
            message: 'No menu for the day'
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

  return menuController;
}();

exports.default = menuController;