import mealsDb from '../model/meal';
/**
 * class Meal controls all meals methods
 * @class Meal
 */
class Meal {
  /**
   * GET all  meals
   * @param {any} req
   * @param {any} res
   * @returns {json} it gets all meals
   * @memberof Meal
   */
  getAllMeals(req, res) {
    if (mealsDb.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'no meal available'
      });
    }
    return res.status(200).json({
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
  addMeal(req, res) {
    const { category, name, price } = req.body;
    const id = mealsDb.length + 1;
    mealsDb.forEach((meal) => {
      if (req.body.name === meal.name) {
        return res.status(404)
          .json({
            status: 'fail',
            message: 'meal name already exists, add another meal',
          });
      }
    });
    const meal = {
      id,
      category,
      name,
      price
    };
    mealsDb.push(meal);
    return res.status(201)
      .json({
        status: 'successfully updated',
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
  updateMeal(req, res) {
    const { id } = req.params;
    let putMeal;
    mealsDb.forEach((meal) => {
      if (req.body.name === meal.name) {
        return res.status(400).json({
          status: 'fail',
          message: 'meal name already exists, add another meal',
          meal: putMeal
        });
      }
      if (meal.id === parseInt(id, 10)) {
        meal.category = req.body.category || meal.category;
        meal.name = req.body.name || meal.name;
        meal.price = req.body.price || meal.location;
        putMeal = meal;
      }
    });
    if (putMeal) {
      return res.status(200).json({ status: 'successfully updated', message: 'meal updated', meal: putMeal });
    }
    return res.status(404).json({ status: 'meal not updated', message: 'cannot find meal', id });
  }
  /**
   * DELETE a meal
   * @param {any} req
   * @param {any} res
   * @returns {json} deletes a meal
   * @memberof Meal
   */
  deleteMeal(req, res) {
    const { id } = req.params;
    for (let i = 0; i < mealsDb.length; i += 1) {
      if (parseInt(mealsDb[i].id, 10) === parseInt(id, 10)) {
        const deletedMeal = mealsDb.splice(i, 1);
        return res.status(200)
          .json({
            status: 'successfully deleted',
            message: 'meal has been deleted',
            deletedMeal
          });
      }
    }
    return res.status(404).json({
      status: 'meal not deleted',
      message: 'cannot find meal',
      id
    });
  }
}
const mealController = new Meal();
export default mealController;
