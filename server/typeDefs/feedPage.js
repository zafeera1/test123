const { gql } = require('apollo-server-express');

const feedTypeDefs = gql`
  extend type Query {
    getAllUserCreatedRecipes: [Recipe]
  }
`;

module.exports = feedTypeDefs;
