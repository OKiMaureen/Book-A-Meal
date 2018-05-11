// Import meal controller
import mealsController from '../controllers/mealController';
// Import meal controller
//import ordersController from '../controllers/orderController';
// Import menu controller
import menuController from '../controllers/menuController';
// Import user controller
import userController from '../controllers/userController';
import {
  validateSignin,
  validateSignup,
  validateUserLength
} from '../validations/userValidation';
import { authenticateUser, authenticateAdmin } from '../validations/authLogin';
import { validateMeals, isNumber } from '../validations/mealValidation';
import Validators from '../validations/menuValidation';

const routes = (app) => {
  // default route
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to Book-A-Meal API');
  });
  app.post('/api/v1/auth/signup', validateSignup, validateUserLength, userController.registerUser);
  // log in registered user
  app.post('/api/v1/auth/login', validateSignin, userController.loginUser);

  // get menu
  app.get('/api/v1/menu', authenticateUser, menuController.getMenu);
  // post order
  // app.post('/api/v1/orders', authenticateUser, ordersController.addOrder);
  // put order
  // app.put('/api/v1/orders/:id', authenticateUser, ordersController.updateOrder);
  // get order
  // app.get('/api/v1/orders', authenticateUser, ordersController.getOrders);
  app.use('*', authenticateAdmin);
  // get of all meals
  app.get('/api/v1/meals', mealsController.getAllMeals);
  // post meals
  app.post('/api/v1/meals', isNumber, validateMeals, mealsController.addMeal);
  // update meals
  app.put('/api/v1/meals/:id', isNumber, validateMeals, mealsController.updateMeal);
  // delete meals
  app.delete('/api/v1/meals/:id', mealsController.deleteMeal);
  // post menu
  app.post('/api/v1/menu', Validators.menuValidator, menuController.addMenu);
};
export default routes;
