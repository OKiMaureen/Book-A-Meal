// Import meal controller
import mealsController from '../controllers/mealController';
// Import meal controller
import ordersController from '../controllers/orderController';
// Import menu controller
import menuController from '../controllers/menuController';
// Import user controller
import userController from '../controllers/userController';

import {
  mealValidator,
  verifyMealLength,
  verifyMealNumber
} from '../validations';
import {
  validateSignin,
  validateSignup,
  validateUserLength
} from '../validations/userValidation';
import authenticate from '../validations/authLogin';

const routes = (app) => {
  // default route
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to Book-A-Meal API');
  });
  app.post('/api/v1/auth/signup', validateSignup, validateUserLength, userController.registerUser);
  // log in registered user
  app.post('/api/v1/auth/login', validateSignin, userController.loginUser);
  // get of all meals
  app.get('/api/v1/meals', authenticate, mealsController.getAllMeals);
  // post meals
  app.post('/api/v1/meals', authenticate, mealValidator, verifyMealLength, verifyMealNumber, mealsController.addMeal);
  // update meals
  app.put('/api/v1/meals/:id', authenticate, mealValidator, verifyMealLength, verifyMealNumber, mealsController.updateMeal);
  // delete meals
  app.delete('/api/v1/meals/:id', authenticate, mealsController.deleteMeal);
  // post menu
  app.post('/api/v1/menu', authenticate, menuController.addMenu);
  // get menu
  app.get('/api/v1/menu', authenticate, menuController.getMenu);
  // post order
  app.post('/api/v1/orders', authenticate, ordersController.addOrder);
  // put order
  app.put('/api/v1/orders/:id', authenticate, ordersController.updateOrder);
  // get order
  app.get('/api/v1/orders', authenticate, ordersController.getOrders);
};
export default routes;
