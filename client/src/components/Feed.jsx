import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_RECIPES = gql`
  query GetRecipes {
    getAllUserCreatedRecipes {
      id
      title
      description
      ingredients
      instructions
      createdBy {
        username
      }
    }
  }
`;

const Feed = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching recipes:', error);
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.getAllUserCreatedRecipes) {
    console.error('No recipes found:', data);
    return <p>No recipes found.</p>;
  }

  return (
    <div className="feed-container">
      {data.getAllUserCreatedRecipes.map(recipe => (
        <div 
          key={recipe.id} 
          className="recipe-card" 
          style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', cursor: 'pointer' }} 
          onClick={() => setExpandedRecipeId(expandedRecipeId === recipe.id ? null : recipe.id)}
        >
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          {recipe.createdBy?.username ? (
            <p><strong>Author: </strong>{recipe.createdBy.username}</p>
          ) : (
            <p><strong>Author: </strong>Unknown</p>
          )}
          {expandedRecipeId === recipe.id && (
            <>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li> 
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
