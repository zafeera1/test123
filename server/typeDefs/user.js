const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    recipes: [Recipe]
  }

  type Auth {
    token: ID
    user: User
  }

  extend type Query {
    getUser(userId: ID!): User
    getUserRecipes(userId: ID!): [Recipe]
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = userTypeDefs;
