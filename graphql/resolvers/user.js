require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
  validateRegisterInput,
  validateLoginInput
} = require('../../utils/validator');

const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      // Check if the user's account is locked
      if (user.loginAttempts >= 5) {
        throw new UserInputError('Account locked', {
          errors: {
            general: 'Your account has been locked due to multiple failed login attempts. Please contact support.'
          }
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
      
        await User.findByIdAndUpdate(user._id, { $inc: { loginAttempts: 1 } });
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

     
      await User.findByIdAndUpdate(user._id, { loginAttempts: 0 });

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
     
      
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username already exists', {
          errors: {
            username: 'This username is taken'
          }
        });
      }
     
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};