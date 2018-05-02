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
    const todaysDate = (new Date()).toLocaleDateString();
    const { mealIds } = req.body;
    if (!req.body.date) {
      return res.status(400).json({
        message: 'date is required',
        error: true
      });
    }
    const menuDateExisting = menuDb.find(menu => menu.date === req.body.date);
    if (menuDateExisting) {
      return res.status(400).json({
        message: 'date is already existing',
        error: true
      });
    }
    const meals = mealIds.map(mealId => mealsDb.find(meal => meal.id === mealId));
    const menu = {
      date: todaysDate,
      meals
    };
    menuDb.push(menu);
    return res.status(201)
      .json({
        status: 'successfully added menu',
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
    const todaysDate = (new Date()).toLocaleDateString();
    const foundDate = menuDb.find(menu => menu.date === todaysDate);
    if (foundDate) {
      return res.status(200).json({
        status: 'success',
        menu: foundDate
      });
    }
    if (!foundDate) {
      return res.status(400).json({
        status: 'no menu for the day yet',
      });
    }
  }
}
const menuController = new Menu();
export default menuController;
