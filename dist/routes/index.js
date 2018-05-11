'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mealController = require('../controllers/mealController');

var _mealController2 = _interopRequireDefault(_mealController);

var _orderController = require('../controllers/orderController');

var _orderController2 = _interopRequireDefault(_orderController);

var _menuController = require('../controllers/menuController');

var _menuController2 = _interopRequireDefault(_menuController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _userValidation = require('../validations/userValidation');

var _authLogin = require('../validations/authLogin');

var _mealValidation = require('../validations/mealValidation');

var _menuValidation = require('../validations/menuValidation');

var _menuValidation2 = _interopRequireDefault(_menuValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import menu controller
// Import meal controller
var routes = function routes(app) {
  // default route
  app.get('/', function (req, res) {
    res.status(200).send('Welcome to Book-A-Meal API');
  });
  app.post('/api/v1/auth/signup', _userValidation.validateSignup, _userValidation.validateUserLength, _userController2.default.registerUser);
  // log in registered user
  app.post('/api/v1/auth/login', _userValidation.validateSignin, _userController2.default.loginUser);

  // get menu
  app.get('/api/v1/menu', _authLogin.authenticateUser, _menuController2.default.getMenu);
  // post order
  // app.post('/api/v1/orders', authenticateUser, ordersController.addOrder);
  // put order
  // app.put('/api/v1/orders/:id', authenticateUser, ordersController.updateOrder);
  // get order
  // app.get('/api/v1/orders', authenticateUser, ordersController.getOrders);
  app.use('*', _authLogin.authenticateAdmin);
  // get of all meals
  app.get('/api/v1/meals', _mealController2.default.getAllMeals);
  // post meals
  app.post('/api/v1/meals', _mealValidation.validatemeals, _mealValidation.isNumber, _mealController2.default.addMeal);
  // update meals
  app.put('/api/v1/meals/:id', _mealValidation.validatemeals, _mealValidation.isNumber, _mealController2.default.updateMeal);
  // delete meals
  app.delete('/api/v1/meals/:id', _mealController2.default.deleteMeal);
  // post menu
  app.post('/api/v1/menu', _menuValidation2.default, _menuController2.default.addMenu);
};
// Import user controller

// Import meal controller
exports.default = routes;