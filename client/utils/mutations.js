import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`
export const SIGNUP_USER = gql `
mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        email
        id
        username
      }
    }
  }
`
export const CREATE_RECIPE = gql `
  mutation Mutation($userId: ID!, $title: String!, $description: String!, $ingredients: [String!]!, $instructions: String!) {
    createRecipe(userId: $userId, title: $title, description: $description, ingredients: $ingredients, instructions: $instructions) {
      createdAt
      createdBy {
        username
      }
      description
      id
      ingredients
      instructions
      title
    }
  }
`
export const UPDATE_RECIPE = gql `
mutation UpdateRecipe($recipeId: ID!) {
  updateRecipe(recipeId: $recipeId) {
    createdBy {
      id
    }
    ingredients
    instructions
    title
    id
    description
  }
}
`
export const DELETE_RECIPE = gql `
mutation DeleteRecipe($recipeId: ID!) {
  deleteRecipe(recipeId: $recipeId)
} 
`
