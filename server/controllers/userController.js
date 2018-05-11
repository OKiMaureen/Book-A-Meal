import bcrypt from 'bcrypt';
import db from '../models';
import createToken from '../helper/token';

const { User } = db;

/**
 * @class userController
 *
 * @export
 *
 */
export default class userController {
  /**
     * @description - Creates a new user
     * @static
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     *
     * @memberof userController
     *
     * @returns {object} Class instance
     */
  static registerUser(req, res) {
    const password = bcrypt.hashSync(req.body.password.trim(), 10);
    const {
      name, email, role
    } = req.body;

    User.findOne({
      where: {
        email
      }
    }).then((existingEmail) => {
      console.log('>>>>>>>>>>>', existingEmail);
      if (existingEmail) {
        return res.status(409)
          .json({
            status: 'fail',
            message: 'Email already exist',
          });
      }
      return User.create({
        name,
        email,
        password,
        role
      })
        .then((newUser) => {
          const token = createToken(newUser);
          return res.status(201)
            .json({
              status: 'success',
              message: 'signup sucessful',
              user: {
                email: newUser.email,
                id: newUser.id
              },
              token
            });
        });
    })
      .catch(error => res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error
      }));
  }


  /**
     * @description - Login a user
     * @static
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     *
     * @memberof userController
     *
     * @returns {object} Class instance
     */
  static loginUser(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404)
            .json({
              status: 'fail',
              message: 'user does not exist',
            });
        }
        const validPassword = bcrypt.compareSync(password.trim(), foundUser.password);
        if (!validPassword) {
          return res.status(401)
            .json({
              status: 'fail',
              message: 'You entered a wrong password',
            });
        }
        const token = createToken(foundUser);
        return res.status(200)
          .json({
            status: 'success',
            token,
            foundUser: {
              id: foundUser.id,
              email: foundUser.email,
              role: foundUser.role

            }
          });
      })
      .catch(error => res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error
      }));
  }
}
