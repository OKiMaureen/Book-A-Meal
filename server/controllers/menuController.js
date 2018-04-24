import menuDb from '../model/menu';
import mealsDb from '../model/meal';
/**
 * class Menu controls all menu methods
 * @class Menu
 */
class Menu {
  /**
   * POST a new menu
   * @param {any} req
   * @param {any} res
   * @returns {json} adds new menu
   * @memberof Meal
   */
  postMenu(req, res) {
    const { date, mealId } = req.body;
    const id = menuDb.length;
    let meal;
    for (let i = 0; i < mealsDb.length; i += 1) {
      if (parseInt(mealsDb[i].id, 10) === parseInt(mealId, 10)) {
        meal = {
          category: mealsDb[i].category,
          name: mealsDb[i].name,
          price: mealsDb[i].price
        };
      }
    }
    const menu = {
      id,
      date,
      meal
    };
    menuDb.push(menu);
    return res.status(201)
      .json({
        status: 'sucessfully updated',
        message: 'menu added',
        menu
      });
  }
}
const menuController = new Menu();
export default menuController;
