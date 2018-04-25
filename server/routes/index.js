// Import meal controller
import mealsController from '../controllers/mealController';
// Import menu controller
import menuController from '../controllers/menuController';
// Import order controller
import ordersController from '../controllers/orderController';

const routes = (app) => {
  // default route
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to Book-A-Meal API');
  });

  // get of all meals
  app.get('/api/v1/meals', mealsController.getAllMeal);
  // post meals
  app.post('/api/v1/meals', mealsController.postMeal);
  // update meals
  app.put('/api/v1/meals/:id', mealsController.putMeal);
  // delete meals
  app.delete('/api/v1/meals/:id', mealsController.deleteMeal);
  // post menu
  app.post('/api/v1/menu', menuController.postMenu);
  // get menu
  app.get('/api/v1/menu', menuController.getMenu);
  // post order
  app.post('/api/v1/orders', ordersController.postOrder);
  // put order
  app.put('/api/v1/orders/:id', ordersController.putOrder);
};
export default routes;
