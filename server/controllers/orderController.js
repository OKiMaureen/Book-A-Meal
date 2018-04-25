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
    const todaysDate = (new Date()).toLocaleDateString();
    const menuForTheDay = menuDb.find(menu => menu.date === todaysDate);
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
  /**
   * PUT a new order
   * @param {any} req
   * @param {any} res
   * @returns {json} updates order
   * @memberof Order
   */
  putOrder(req, res) {
    const todaysDate = (new Date()).toLocaleDateString();
    const menuForTheDay = menuDb.find(menu => menu.date === todaysDate);
    if (!menuForTheDay) {
      return res.status(404).json({
        status: 'fail',
        message: todaysDate
      });
    }
    if (menuForTheDay) {
      const { id } = req.params;
      const { mealIds } = req.body;
      let putOrder;
      ordersDb.forEach((order) => {
        if (order.id === parseInt(id, 10)) {
          order.meals = mealIds.map(mealId => menuForTheDay.meals.find(meal => meal.id === mealId));

          putOrder = order;
        }
      });
      if (putOrder) {
        return res.status(200).json({
          status: 'successfully updated',
          message: 'order updated',
          order: putOrder
        });
      }
      return res.status(404).send(`cannot find order with id ${id}`);
    }
  }
}
const ordersController = new Order();
export default ordersController;

