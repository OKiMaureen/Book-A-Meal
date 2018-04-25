import mealsDb from '../model/meal';
/**
 * class Event controls all event methods
 * @class meal
 */
class Meal {
  /**
   * GET all  meals
   * @param {any} req
   * @param {any} res
   * @returns {json} gets all meals
   * @memberof Event
   */
  getAllMeal(req, res) {
    res.status(200).json({
      meals: mealsDb,
      status: 'success'
    });
  }
  /**
   * POST a new event
   * @param {any} req
   * @param {any} res
   * @returns {json} adds new event
   * @memberof Event
   */
  postMeal(req, res) {
    const { category, name, price } = req.body;
    const id = mealsDb.length + 1;
    const meal = {
      id,
      category,
      name,
      price
    };
    mealsDb.push(meal);
    return res.status(201)
      .json({
        status: 'sucessfully updated',
        message: 'meal added',
        meal
      });
  }
}
const mealController = new Meal();
export default mealController;
