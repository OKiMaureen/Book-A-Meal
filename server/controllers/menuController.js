import db from '../models';

const { Meal, Menu } = db;

/**
 * class Menu controls all menu methods
 * @class Menu
 */
export default class menuController {
  /**
   * POST a new menu
   * @param {any} req
   * @param {any} res
   * @returns {json} adds new menu
   * @memberof Menu
   */
  static addMenu(req, res) {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(401).send();
    }
    const {
      mealId
    } = req.body;
    Menu.create({
      menuName: 'Menu for the day',
      userId: req.user.id
    }).then((menu) => {
      console.log('>>>>>>>>>', menu);
      menu.setMeals(mealId);
      res.status(201).json({
        status: 'success',
        message: 'menu updated successfully',
      });
    });
  }

}
