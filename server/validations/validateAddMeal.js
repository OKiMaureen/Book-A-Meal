import { Meals } from '../models';

const check = (req, res, next) => {
  Meal.findOne({
    where: {
      name
    }
  })
    .then((existingMeal) => {
      if (existingMeal) {
        return res.status(400)
          .json({
            status: 'fail',
            message: 'this meal already exists'
          });
      }
      next();
    });
};
