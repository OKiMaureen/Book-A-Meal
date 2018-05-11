'use strict';

var _models = require('../models');

var check = function check(req, res, next) {
  Meal.findOne({
    where: {
      name: name
    }
  }).then(function (existingMeal) {
    if (existingMeal) {
      return res.status(400).json({
        status: 'fail',
        message: 'this meal already exists'
      });
    }
    next();
  });
};