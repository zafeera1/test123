const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

const userResolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      return await User.findById(userId);
    },
    getUserRecipes: async (_, { userId }) => {
      return await Recipe.find({ createdBy: userId });
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        console.log("Registering user:", { username, email, password });
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('password', hashedPassword)
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET environment variable is not defined");
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("User registered:", user);
        return { token, user };
      } catch (error) {
        if (error.code === 11000) {
          const field = Object.keys(error.keyValue)[0];
          const value = error.keyValue[field];
          console.error(`Duplicate key error: ${field}: ${value}`);
          throw new Error(`The ${field} ${value} is already in use.`);
        }
        console.error("Error registering user:", error);
        throw new Error("Error registering user");
      }
    },
    login: async (_, { email, password }) => {
      try {
        console.log("Logging in user with email:", email);
        const user = await User.findOne({ email });
        if (!user) {
          console.error("User not found");
          throw new Error('User not found');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('password', password, user.password, hashedPassword)
        const isValid = await bcrypt.compare(password, '$2a$10$Ko5x0Qn2P8QJprI6kMghmu374VPGT.SC20nqyELQgcid2xEfcCdb2');
        if (!isValid) {
          console.error("Invalid password");
          throw new Error('Invalid password');
        }

        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET environment variable is not defined");
        }

        const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("User logged in:", user);
        return { token, user };
      } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error("Error logging in user");
      }
    },
  },
  User: {
    recipes: async (parent) => {
      return await Recipe.find({ createdBy: parent.id });
    },
  },
};

module.exports = userResolvers;
