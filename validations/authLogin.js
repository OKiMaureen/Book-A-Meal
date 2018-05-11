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
export const authenticateUser = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.query.token;

  try {
    const verifiedToken = jwt.verify(token, secretKey);
    req.decoded = verifiedToken;
    User.findOne({
      where: { id: req.decoded.id }
    }).then((user) => {
      if (!user) {
        return res.status(400).send('no user found');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'access denied',
      error
    });
  }
};


export const authenticateAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.query.token;
  try {
    const verifiedToken = jwt.verify(token, secretKey);
    req.decoded = verifiedToken;
    User.findOne({
      where: { id: req.decoded.id }
    }).then((user) => {
      if (!user) {
        return res.status(400).send('no user');
      }
      req.user = user;
      const { role } = req.user;
      if (role !== 'admin') {
        return res.status(401).send();
      }
      next();
    });
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'access denied',
      error
    });
  }
};

