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
}
const mealController = new Meal();
export default mealController;
