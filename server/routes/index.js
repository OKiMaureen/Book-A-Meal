// Import meal controller
import mealsController from '../controllers/mealController';
// Import meal controller
import menuController from '../controllers/menuController';

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
};
export default routes;
