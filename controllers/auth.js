const UserModel = require('../models/user');
const middy = require('@middy/core');
const cors = require('@middy/http-cors');

const auth = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const authUser = await user.matchPassword(password);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '1800');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (authUser) {
    res.status(200);
    return res.json({
      name: user.name,
      email: user.email,
      token: user.generateToken(),
      message: 'You have successfully logged in',
    });
  } else {
    res.status(400);
    return res.json({
      message: 'Invalid email or password',
    });
  }
};

module.exports = { auth };
