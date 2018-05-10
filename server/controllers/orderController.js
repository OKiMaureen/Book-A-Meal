import moment from 'moment';
import { Order, Meal } from '../models';

/**
 * class Order controls all order methods
 * @class Order
 */
export default class orderController {
  /**
   * POST a new order
   * @param {any} req
   * @param {any} res
   * @returns {json} adds new order
   * @memberof Order
   */
  static addOrder(req, res) {
    const {
      mealId, quantity
    } = req.body;
    Menu.findOne()
    Order.create({
      mealId,
      userId: req.userId
    }).then((order) => {
      order.addMeal(mealId);
      return res.status(200).json({
        status: true,
        message: 'order added successfully'
      });
    });
  }
}
