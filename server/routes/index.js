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
  // post meals
  app.post('/api/v1/meals', mealController.postMeal);
  // update meals
  app.put('/api/v1/meals/:id', mealController.putMeal);
};
export default routes;
