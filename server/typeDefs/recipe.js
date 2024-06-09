const { gql } = require('apollo-server-express');

const recipeTypeDefs = gql`
type Recipe {
  id: ID!
  title: String!
  description: String!
  ingredients: [String!]!
  instructions: String!
  createdBy: User
  createdAt: String
  image: String
}

type User {
  id: ID!
  username: String!
  email: String!
  recipes: [Recipe]
  savedRecipes: [Recipe]
}

extend type Query {
  getAllUserCreatedRecipes: [Recipe]
  getRecipe(recipeId: ID!): Recipe
  getUser(userId: ID!): User
  getUserRecipes(userId: ID!): [Recipe]
  getUserProfile(userId: ID!): UserProfile
  getRecipesByIngredients(ingredients: [String!]!): [Recipe]
}

extend type Mutation {
  createRecipe(userId: ID!, title: String!, description: String!, ingredients: [String!]!, instructions: String!): Recipe
  updateRecipe(recipeId: ID!, title: String, description: String, ingredients: [String!], instructions: String): Recipe
  deleteRecipe(recipeId: ID!): String
}
`;

module.exports = recipeTypeDefs;

