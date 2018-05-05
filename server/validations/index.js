import validator from 'validator';
import isEmpty from 'lodash.isempty';


export const mealValidator = (req, res, next) => {
  const {
    category,
    name,
    price
  } = req.body;
  const error = {};
  // check if category is empty
  if (!category || category === undefined) {
    error.category = 'category is required';
  }
  if (category && validator.isEmpty(category)) {
    error.category = 'category is required';
  }
  // check if meal name is empty
  if (!name || name === undefined || name === ' ') {
    error.name = 'name is required';
  }
  if (name && validator.isEmpty(name)) {
    error.name = 'name is required';
  }
  // check if price is empty
  if (!price || price.length === 0) {
    error.price = 'price is required';
  }
  if (price && validator.isEmpty(price)) {
    error.price = 'price is required';
  }
  if (isEmpty(error)) return next();
  return res.status(400).json({
    error
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
  const error = {};


  if (Number.isNaN(parseInt(price, 10))) {
    error.price = 'price must be a number';
  }
  if (isEmpty(error)) return next();
  return res.status(400).json({
    error
  });
};
