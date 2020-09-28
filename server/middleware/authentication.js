/* eslint no-console: 0 */
const jwt = require('jsonwebtoken');
const { User } = require('../model');
const SECRET_KEY = 'supercalifragilisticexpialidocious';

const authenticateMe = async (req, res, next) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(token, SECRET_KEY);
    // attempt to find user object and set to req
    const user = await User.findOne({ _id });
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
    console.log('---> Error in authentication middleware', error);
  }
};

module.exports = authenticateMe;
