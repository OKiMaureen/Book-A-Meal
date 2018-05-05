import menuDb from '../model/menu';
import mealDb from '../model/meal';
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
      const meals = [];
      mealIds.forEach(mealId => meals.push(...mealDb.filter(meal => meal.id === mealId)));
      ordersDb.push({
        id,
        meals
      });
      return res.status(201).json({ status: 'successfully updated', message: 'order added', meals });
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
      const { id } = req.params.id;
      const { mealIds } = req.body;
      const meals = [];
      ordersDb.forEach((order) => {
        if (order.id === parseInt(req.params.id, 10)) {
          mealIds.forEach(mealId => meals.push(...mealDb.filter(meal => meal.id === mealId)));
          order.meals.length = 0;
          order.meals = meals;
        }
      });
      if (meals) {
        return res.status(200).json({ status: 'successfully updated', message: 'order updated', meals });
      }
      return res.status(404).json({ status: 'fail', message: `cannot find order with ${id}` });
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

