import menuDb from '../model/menu';
import ordersDb from '../model/order';
/**
 * class Order controls all order methods
 * @class Order
 */
class Order {
  /**
   * POST a new order
   * @param {any} req
   * @param {any} res
   * @returns {json} adds new order
   * @memberof Order
   */
  postOrder(req, res) {
    const menuForTheDay = menuDb.find(menu => menu.date === req.query.date);
    if (!menuForTheDay) {
      return res.status(404).json({
        status: 'fail',
        message: 'no menu for the day'
      });
    }

    if (menuForTheDay) {
      const id = ordersDb.length + 1;
      const { mealIds } = req.body;

      const meals = mealIds.map(mealId => menuForTheDay.meals.find(meal => meal.id === mealId));
      const order = {
        id,
        meals
      };

      ordersDb.push(order);
      return res.status(201)
        .json({
          status: 'sucessfully updated',
          message: 'order added',
          order
        });
    }
  }
}
const ordersController = new Order();
export default ordersController;

