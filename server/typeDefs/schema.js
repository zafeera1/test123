const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    recipes: [Recipe]
    savedRecipes: [Recipe]
  }

  type Recipe {
    id: ID!
    title: String!
    ingredients: [String!]!
    instructions: String!
    createdBy: User
    createdAt: String
  }

  type Ingredient {
    id: ID!
    name: String!
  }

  type UserProfile {
    user: User!
    createdRecipes: [Recipe]
    savedRecipes: [Recipe]
  }

  type Query {
    getUser(userId: ID!): User
    getUserRecipes(userId: ID!): [Recipe]
    getAllUserCreatedRecipes: [Recipe]
    getRecipe(recipeId: ID!): Recipe
    getIngredients(query: String!): [Ingredient]
    getUserProfile(userId: ID!): UserProfile
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
    createRecipe(userId: ID!, title: String!, ingredients: [String!]!, instructions: String!): Recipe
  }
`;

module.exports = typeDefs;
