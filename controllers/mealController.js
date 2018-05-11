import pick from 'lodash.pick';
import db from '../models';

const { Meal } = db;


/**
 * @class mealController
 *
 * @export
 *
 */
export default class mealController {
  /**
   * @description - Add a new meal
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof mealController
   *
   * @returns {object} Class instance
   */
  static addMeal(req, res) {
    const {
      category, name, price, image
    } = req.body;

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
        return Meal.create({
          category,
          name,
          price,
          image,
          userId: req.user.id
        })
          .then((newMeal) => {
            const mealDetails = pick(newMeal, ['category', 'name', 'price', 'image']);
            res.status(201)
              .json({
                status: 'success',
                message: 'Meal created successfully',
                meal: mealDetails
              });
          });
      })
      .catch(error => res.status(500).json({
        status: 'error',
        message: 'internal server error',
        error
      }));
  }
  /**
   * @description - get all meals
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof mealController
   *
   * @returns {object} Class instance
   */
  static getAllMeals(req, res) {
    return Meal.findAll()
      .then(foundMeal => res.status(200).json({
        status: true,
        meal: foundMeal
      }))
      .catch(error => res.status(500).json({
        status: 'error',
        message: 'internal server error',
        error
      }));
  }
  /**
   * @description - Update a meal
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof mealController
   *
   * @returns {object} Class instance
   */
  static updateMeal(req, res) {
    Meal.findOne({
      where: {
        name: req.body.name
      }
    })
      .then((existingMeal) => {
        if (existingMeal) {
          return res.status(400)
            .json({
              status: false,
              message: 'The meal name already exists'
            });
        }
        return Meal.findOne({
          where: {
            id: req.params.id
          }
        })
          .then((foundMeal) => {
            if (!foundMeal) {
              res.status(404).json({
                status: false,
                message: `Meal id  ${req.params.id} not found`
              });
            }
            return foundMeal.update({
              category: req.body.category || Meal.category,
              name: req.body.name || Meal.name,
              price: req.body.price || Meal.price,
              image: req.body.image || Meal.image,

            });
          }).then((updatedMeal) => {
            const mealDetails = pick(updatedMeal, ['category', 'name', 'price', 'image']);
            res.status(201)
              .json({
                status: true,
                message: 'Meal updated successfully',
                meal: mealDetails
              });
          });
      })
      .catch(error => res.status(500).json({
        status: 'error',
        message: 'internal server error',
        error
      }));
  }
  /**
 * @description - Delete an Meal
 * @static
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 *
 * @memberof mealController
 *
 * @returns {object} Class instance
 */
  static deleteMeal(req, res) {
    Meal.findOne({
      where: {
        id: req.params.id,
      }
    })
      .then((foundMeal) => {
        if (!foundMeal) {
          return res.status(404)
            .json({
              status: 'fail',
              message: `Can't find meal with id ${req.params.id} `
            });
        }
        if (foundMeal) {
          foundMeal.destroy({
            where: {
              id: req.params.id,
            }
          })
            .then(() => res.status(200)
              .json({
                status: true,
                message: `Meal with ${req.params.id} deleted`,
              }));
        }
      })
      .catch(error => res.status(500).json({
        status: 'error',
        message: 'internal server error',
        error
      }));
  }
}

