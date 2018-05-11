import moment from 'moment';
import {
  Menu,
  Meal
} from '../models';

/**
 * class Menu controls all menu methods
 * @class Menu
 */
export default class menuController {
  /**
   * POST a new menu
   * @param {any} req
   * @param {any} res
   * @returns {json} adds new menu
   * @memberof Menu
   */
  static addMenu(req, res) {
    const {
      menuName,
      mealId,
      date
    } = req.body;
    Menu.findOne({
      where: {
        date: moment()
      }
    })
      .then((menu) => {
        if (menu) {
          return res.status(409).json({
            error: 'menu for the day already exists'
          });
        }
        Meal.findAll({
          attributes: ['id']
        })
          .then((meals) => {
            if (!meals) {
              return res.status(404).json({ error: 'No meal was found' });
            }
            const foundMeal = meals.map(meal => meal.id);
            const mealNotFound = req.body.mealId
              .filter(id => foundMeal.indexOf(parseInt(id, 10)) === -1);
            if (mealNotFound.length >= 1) {
              return res.status(404).json({
                message: 'Cannot set menu, These meals Ids were not found',
                meals: mealNotFound.join(',')
              });
            }
            Menu.create({
              menuName,
              date,
              userId: req.user.id
            }).then((newMenu) => {
              newMenu.setMeals(mealId);
              res.status(201).json({
                status: true,
                message: 'menu added successfully',
              });
            })
              .catch(error => res.status(500).json({
                status: 'error',
                message: 'internal server error',
                error
              }));
          });
      });
  }

  /**
   * GET menu menu
   * @param {any} req
   * @param {any} res
   * @returns {json} gets menu
   * @memberof Menu
  */
  static getMenu(req, res) {
    Menu.find({
      where: ({
        date: moment()
      }),
      include: [{
        model: Meal
      }]
    })
      .then((menu) => {
        menu.getMeals({
          attributes: ['category', 'name', 'price', 'image']
        })
          .then(foundMenu => res.status(200).json({
            status: true,
            message: 'menu gotten successfully',
            menu: foundMenu
          }));
        if (!menu) {
          return res.status(404)
            .json({
              status: false,
              message: 'No menu for the day'
            });
        }
      })
      .catch(error => res.status(500).json({
        status: 'error',
        message: 'internal server error',
        error
      }));
  }
}

