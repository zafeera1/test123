
const userResolvers = require('./user');
const recipeResolvers = require('./recipe');
const ingredientsResolvers = require('./ingredients');
const feedResolvers = require('./feedPage');
const profileResolvers = require('./profile');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...recipeResolvers.Query,
    ...ingredientsResolvers.Query,
    ...feedResolvers.Query,
    ...profileResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...recipeResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Recipe: {
    ...recipeResolvers.Recipe,
  }
};

module.exports = resolvers;
