const { gql } = require('apollo-server-express');

const profileTypeDefs = gql`
  type UserProfile {
    user: User
    createdRecipes: [Recipe]
    savedRecipes: [Recipe]
  }

  extend type Query {
    getUserProfile: UserProfile
  }
`;

module.exports = profileTypeDefs;
