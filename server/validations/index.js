import validator from 'validator';

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
  mealValidator(req, res, next) {
    const {
      category,
      name,
      price
    } = req.body;
    const errors = {};
    if (category === undefined || name === undefined || price === undefined) {
      res.status(400)
        .json({
          message: 'All or some of the field is/are undefined',
        });
    } else {
      // check if category is empty
      if (!category) {
        errors.category = 'category is required';
      }
      if (category && validator.isEmpty(category.trim() || '')) {
        errors.category = 'category is required';
      }

      // check if meal is empty
      if (!name) {
        errors.name = 'name is required';
      }
      if (name && validator.isEmpty(name.trim() || '')) {
        errors.name = 'name is required';
      }
      // check for name of meal length
      if (!validator.isLength(name, {
        min: 3,
        max: 18
      })) {
        errors.name = 'name of meal must between 3 to 15 characters';
      }

      // check if price is empty
      if (!price) {
        errors.price = 'price is required';
      }
      if (price && validator.isEmpty(price.trim() || '')) {
        errors.price = 'price is required';
      }
      // check if price is a number
      if (Number.isNaN(parseInt(price, 10))) {
        errors.price = 'price must be a number';
      }
      if (Object.keys(errors).length !== 0) {
        return res.status(400)
          .json(errors);
      }
      next();
    }
  }
}


const validate = new Validator();

export default validate;
