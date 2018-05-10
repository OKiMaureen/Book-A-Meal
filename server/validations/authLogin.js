import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';


const { User } = db;


dotenv.config();
const secretKey = process.env.JWT_SECRET;

/**
   * @description - Checks if logged in user has valid AUTH token
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {null} - null
   */
const authenticateUser = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.query.token;

  try {
    const verifiedToken = jwt.verify(token, secretKey);
    req.userId = verifiedToken.id;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'you are not authorized to log in.' });
  }
};


const authenticateAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.query.token;
  try {
    const verifiedToken = jwt.verify(token, secretKey);
    req.decoded = verifiedToken;
    User.findOne({
      where: { id: req.decoded.id }
    }).then((user) => {
      if (!user) {
        res.status(400).send('no user');
        return;
      }
      req.user = user;
      const { role } = req.user;
      if (role !== 'admin') {
        return res.status(401).send();
      }
      next();
    });
  } catch (error) {
    return res.status(401).send({ message: 'you are not authorized to log in.' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };

