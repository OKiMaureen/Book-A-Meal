import isEmpty from 'lodash.isempty';
import Validators from 'validator';
/**
 *
 *
 * @class Validator
 */
class Validator {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {json} validate meal
   * @memberof Validator
   */
  menuValidator(req, res, next) {
    const {
      menuName,
      date,
      mealId
    } = req.body;
    const error = {};
    if (menuName === undefined || date === undefined || mealId === undefined) {
      res.status(400)
        .json({
          message: 'All or some of the field is/are undefined',
        });
    } else {
      if (!menuName) {
        error.menuName = 'menu name is required';
      }

      if (menuName && !Validators.isEmpty(menuName.trim() || '')) {
        error.menuName = 'menu name is required';
      }
      if (!date) {
        error.date = 'date is required';
      }

      if (date && Validators.isEmpty(date.trim() || '')) {
        error.date = 'date is required';
      }
      if (!mealId) {
        error.mealId = 'mealId is required';
      }
      if (mealId && Validators.isEmpty(mealId.trim() || '')) {
        error.price = 'price is required';
      }

      if (isEmpty(error)) return next();
      return res.status(400).json({ error });
    }

    next();
  }
}
const validate = new Validator();

export default validate;

