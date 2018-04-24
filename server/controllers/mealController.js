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
  /**
   * DELETE a meal
   * @param {any} req
   * @param {any} res
   * @returns {json} deletes a meal
   * @memberof Meal
   */
  deleteMeal(req, res) {
    for (let i = 0; i < mealsDb.length; i += 1) {
      if (parseInt(mealsDb[i].id, 10) === parseInt(req.params.id, 10)) {
        mealsDb.splice(i, 1);
        return res.status(200)
          .json({
            status: 'successfully deleted',
            message: 'Meal has been deleted'
          });
      }
    }
    return res.status(404).send('Meal not found');
  }
}
const mealController = new Meal();
export default mealController;
