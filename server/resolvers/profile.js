const Recipe = require('../models/Recipe');
const User = require('../models/User');

const profileResolvers = {
  Query: {
    getUserProfile: async (_, __, { user }) => {
      if (!user) {
        throw new Error('You must be logged in to view your profile');
      }

      const userId = user.id;

      try {
        const userProfile = await User.findById(userId).populate('savedRecipes');
        const createdRecipes = await Recipe.find({ createdBy: userId });

        return {
          user: userProfile,
          createdRecipes,
          savedRecipes: userProfile.savedRecipes
        };
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error('Failed to fetch user profile');
      }
    },
  },
};

module.exports = profileResolvers;
