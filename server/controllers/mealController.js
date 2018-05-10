import pick from 'lodash.pick';
import { Meal } from '../models';


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
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(401).send();
    }

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
      });
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
    const userRole = pick(req.user, ['role']);
    if (userRole.role !== 'admin') {
      return res.status(401).send();
    }
    return Meal.findAll()
      .then(foundMeal => res.status(200).send(foundMeal))
      .catch(error => res.status(400).send(error));
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
    const userRole = pick(req.user, ['role']);
    if (userRole.role !== 'admin') {
      return res.status(401).send();
    }
    Meal.findOne({
      where: {
        name: req.body.name
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
        return Meal.findOne({
          where: {
            id: req.params.id
          }
        })
          .then((foundMeal) => {
            if (!foundMeal) {
              res.status(404).json({
                status: 'fail',
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
                status: 'success',
                message: 'Meal updated successfully',
                meal: mealDetails
              });
          });
      });
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
    const userRole = pick(req.user, ['role']);
    if (userRole.role !== 'admin') {
      return res.status(401).send();
    }
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
                status: 'success',
                message: `Meal with ${req.params.id} deleted`,
              }));
        }
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }
}

