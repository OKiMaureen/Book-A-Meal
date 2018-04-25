// Import meal controller
import mealController from '../controllers/mealController';

const routes = (app) => {
  // default route
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to Book-A-Meal API');
  });

  // get of all meals
  app.get('/api/v1/meals', mealController.getAllMeal);
};
export default routes;
