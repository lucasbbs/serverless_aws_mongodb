const UserModel = require('../models/user');
const { errorFormatter } = require('../middlewares/errorFormatter');
const register = async (req, res) => {
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
  const user = new UserModel(req.body);
  try {
    await user.save();

    return res.json({
      message: 'You have successfully registered',
    });
  } catch (error) {
    res.status(400);
    return res.json({
      case: 'VALIDATION_ERROR',
      message: 'The e-mail is already taken',
      errors: errorFormatter(error.message),
    });
  }
};

module.exports = { register };
