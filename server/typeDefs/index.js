const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user');
const recipeTypeDefs = require('./recipe');
const ingredientsTypeDefs = require('./ingredients');
const feedTypeDefs = require('./feedPage');
const profileTypeDefs = require('./profile')

const baseTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [baseTypeDefs, userTypeDefs, recipeTypeDefs, ingredientsTypeDefs, feedTypeDefs, profileTypeDefs];

module.exports = typeDefs;
