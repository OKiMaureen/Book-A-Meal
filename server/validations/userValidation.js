import isEmpty from 'lodash.isempty';
import Validator from 'validator';


export const validateSignin = (req, res, next) => {
  const { email, password } = req.body;
  const error = {};
  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !Validator.isEmail(email.trim() || '')) {
    error.email = 'Please provide a valid email address';
  }
  if (!password) {
    error.password = 'Password is required';
  }

  if (password && Validator.isEmpty(password.trim() || '')) {
    error.password = 'Password is required';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};


export const validateSignup = (req, res, next) => {
  const {
    email, password, name
  } = req.body;
  const error = {};
  if (!name) {
    error.name = 'Name is required';
  }

  if (name && Validator.isEmpty(name.trim() || '')) {
    error.name = 'Name is required';
  }
  if (!password) {
    error.password = 'Password is required';
  }

  if (password && Validator.isEmpty(password.trim() || '')) {
    error.password = 'Password is required';
  }
  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !Validator.isEmail(email.trim() || '')) {
    error.email = 'Email address is empty or invalid';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};

export const validateUserLength = (req, res, next) => {
  const {
    password
  } = req.body;
  // Check for Password
  if (!Validator.isLength(password, { min: 6, max: 50 })) {
    return res.status(406)
      .send({
        status: 'Fail',
        message: 'Password can only be from 6 to 50 characters',
      });
  }
  next();
};

