const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

const generateToken = ( () => {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { generateToken };
