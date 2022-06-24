const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../utils/config');

const SALT_ROUNDS = 10;

const UserSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: [true, 'Name is required'] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
      index: { unique: true },
      maxlength: [64, "Email can't be longer than 64 characters"],
      minlength: [6, "Email can't be shorter than 6 characters"],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.path('email').validate(async (email) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, 'Email already exists');

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);

    this.password = hash;
    next();
  });
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.generateToken = function (id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
