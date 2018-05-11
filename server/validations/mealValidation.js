import isEmpty from 'lodash.isempty';
import Validator from 'validator';


export const validateMeals = (req, res, next) => {
  const { category, name, price } = req.body;
  const error = {};
  if (!category) {
    error.name = 'category name is required';
  }
  if (category && Validator.isEmpty(category.trim() || '')) {
    error.category = 'category name is required';
  }
  if (!name) {
    error.name = 'meal name is required';
  }

  if (name && Validator.isEmpty(name.trim() || '')) {
    error.name = 'meal name is required';
  }
  if (!price) {
    error.price = 'price is required';
  }
  if (price && Validator.isEmpty(price.trim() || '')) {
    error.price = 'price is required';
  }
  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};
export const isNumber = (req, res, next) => {
  const {
    price
  } = req.body;
  const error = {};
  if (!price) {
    error.price = 'price is required';
  }
  if (price && Validator.isEmpty(price.trim() || '')) {
    error.price = 'price is required';
  }
  // check if price is a number
  if (Number.isNaN(parseInt(price, 10))) {
    error.price = 'price must be a number';
  }
  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};

