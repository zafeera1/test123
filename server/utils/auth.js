const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed
const expiration = "2h";

const protect = async ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  console.log("Token:", token);

  if (!token) {
    console.log("No token provided");
    return { user: null };
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
    console.log("Decoded user ID:", userId);

    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return { user: null };
    }

    return { user };
  } catch (error) {
    console.log('Invalid token:', error.message);
    return { user: null };
  }
};

module.exports = protect;
