import validator from 'validator';
import isEmpty from 'lodash.isempty';


export const mealValidator = (req, res, next) => {
  const {
    category,
    name,
    price
  } = req.body;
  const errors = {};
  // check if category is empty
  if (!category) {
    errors.category = 'category is required';
  }
  if (category && validator.isEmpty(category || '')) {
    errors.category = 'category is required';
    return res.status(406)
      .send({
        status: 'Fail',
        message: 'meal name must be between 3 to 15 characters',
      });
  }
  // check if meal name is empty
  if (!name) {
    errors.name = 'name is required';
  }
  if (name && validator.isEmpty(name || '')) {
    errors.name = 'name is required';
  }
  // check if price is empty
  if (!price) {
    errors.price = 'price is required';
  }
  if (price && validator.isEmpty(price || '')) {
    errors.price = 'price is required';
  }
  if (isEmpty(errors)) return next();
  return res.status(400).json({
    errors
  });
};

// check for name of meal length
export const verifyMealLength = (req, res, next) => {
  const { name } = req.body;
  if (!validator.isLength(name, { min: 3, max: 15 })) {
    return res.status(406)
      .send({
        status: 'Fail',
        message: 'meal name must be between 3 to 15 characters',
      });
  }

  next();
};
export const verifyMealNumber = (req, res, next) => {
  const { price } = req.body;
  const errors = {};


  if (Number.isNaN(parseInt(price, 10))) {
    errors.price = 'price must be a number';
  }
  if (isEmpty(errors)) return next();
  return res.status(400).json({
    errors
  });
};
