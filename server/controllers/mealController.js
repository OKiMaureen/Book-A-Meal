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
   * @memberof Meal
   */
  getAllMeal(req, res) {
    res.status(200).json({
      meals: mealsDb,
      status: 'success'
    });
  }
  /**
   * POST a new meal
   * @param {any} req
   * @param {any} res
   * @returns {json} adds new meal
   * @memberof Meal
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
  /**
   * PUT a new meal
   * @param {any} req
   * @param {any} res
   * @returns {json} updates meal
   * @memberof Meal
   */
  putMeal(req, res) {
    const { id } = req.params;
    let putMeal;
    mealsDb.forEach((meal) => {
      if (meal.id === parseInt(id, 10)) {
        meal.category = req.body.category || meal.category;
        meal.name = req.body.name || meal.nmae;
        meal.price = req.body.price || meal.location;
        putMeal = meal;
      }
    });
    if (putMeal) {
      return res.status(200).json({
        status: 'successfully updated',
        message: 'meal updated',
        meal: putMeal
      });
    }
    return res.status(404).send(`cannot find meal with id ${id}`);
  }
}
const mealController = new Meal();
export default mealController;
