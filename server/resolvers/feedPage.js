const Recipe = require('../models/Recipe');

const feedResolvers = {
  Query: {
    getAllUserCreatedRecipes: async () => {
      try {
        return await Recipe.find({}).populate('createdBy', 'username'); 
      } catch (error) {
        console.error('Error fetching all user-created recipes:', error);
        throw new Error('Failed to fetch all user-created recipes');
      }
    },
  },
};

module.exports = feedResolvers;
