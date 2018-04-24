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
   * @memberof Menu
   */
  postMenu(req, res) {
    const { mealIds } = req.body;
    if (!req.body.date) {
      return res.json({
        message: 'date is required',
        error: true
      });
    }
    const menusAlreadyWithDate = menuDb.filter(menu => menu.date === req.body.date);
    if (menusAlreadyWithDate.length > 1) {
      return res.json({
        message: 'date is already existing',
        error: true
      });
    }
    const meals = mealIds.map(mealId => mealsDb.find(meal => meal.id === mealId));
    const menu = {
      id: menuDb.length + 1,
      date: req.body.date,
      meals
    };
    menuDb.push(menu);
    return res.status(201)
      .json({
        status: 'sucessfully updated',
        message: 'menu added',
        menu
      });
  }
  /**
   * GET menu
   * @param {any} req
   * @param {any} res
   * @returns {json} gets menu
   * @memberof Menu
   */
  getMenu(req, res) {
    res.status(200).json({
      menu: menuDb,
      status: 'success'
    });
  }
}
const menuController = new Menu();
export default menuController;
