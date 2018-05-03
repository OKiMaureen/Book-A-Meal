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
  addOrder(req, res) {
    const todaysDate = (new Date()).toLocaleDateString();
    const menuForTheDay = menuDb.find(menu => menu.date === todaysDate);
    if (!menuForTheDay) {
      return res.status(404).json({ status: 'fail', message: 'no menu for the day' });
    }
    if (menuForTheDay) {
      const id = ordersDb.length + 1;
      const { mealIds } = req.body;
      mealIds.forEach((mealId) => {
        if (mealId > mealIds.length) {
          return res.status(404).json({ status: 'fail', message: 'The meal id below is not available', id: mealId });
        }
      });
      const meals = mealIds.map(mealId => menuForTheDay.meals.find(meal => meal.id === mealId));
      const order = {
        id,
        meals
      };
      ordersDb.push(order);
      return res.status(201).json({ status: 'successfully updated', message: 'order added', order });
    }
  }
  /**
   * PUT a new order
   * @param {any} req
   * @param {any} res
   * @returns {json} updates order
   * @memberof Order
   */
  updateOrder(req, res) {
    const menuForTheDay = menuDb.find(menu => menu.date === (new Date()).toLocaleDateString());
    if (!menuForTheDay) {
      return res.status(404).json({ status: 'fail', message: 'cannot find menu for the day' });
    }
    if (menuForTheDay) {
      const { mealIds } = req.body;
      mealIds.forEach((mealId) => {
        if (mealId > mealIds.length) {
          return res.status(404).json({ status: 'fail', message: 'The meal id below is not available', id: mealId });
        }
      });
      let putOrder;
      ordersDb.forEach((order) => {
        if (order.id === parseInt(req.params.id, 10)) {
          order.meals = mealIds.map(mealId => menuForTheDay.meals.find(meal => meal.id === mealId));
          putOrder = order;
        }
      });
      if (putOrder) {
        return res.status(200).json({ status: 'successfully updated', message: 'order updated', order: putOrder });
      }
      return res.status(404).json({ status: 'fail', message: 'cannot find order', id: req.params.id });
    }
  }
  /**
   * GET all  orders
   * @param {any} req
   * @param {any} res
   * @returns {json} gets all orders
   * @memberof Order
   */
  getOrders(req, res) {
    let total = 0;
    ordersDb.forEach((order) => {
      order.meals.forEach((meal) => {
        total += meal.price;
      });
    });


    return res.status(200).json({
      status: 'success',
      orders: ordersDb,
      total
    });
  }
}
const ordersController = new Order();
export default ordersController;

