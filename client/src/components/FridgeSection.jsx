import React, { useState } from 'react';

const Fridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [getRecipes, { loading, error, data }] = useLazyQuery(GET_RECIPES_BY_INGREDIENTS);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue.trim() !== '') {
      setIngredients([...ingredients, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleSearchRecipes = () => {
    getRecipes({ variables: { ingredients } });
  };

  return (
    <div className="fridge-container">
      <h1 id="center">What's in the fridge?</h1>
      <input
        id="ingred"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter an ingredient"
      />
      <div id="btn">
        <button onClick={handleAddIngredient} id="add">Add</button>
      </div>
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-item">
            <span>{ingredient}</span>
            <button onClick={() => handleDeleteIngredient(index)}>X</button>
          </div>
        ))}
      </div>
      <button onClick={handleSearchRecipes}>Search Recipes</button>

      <div className="recipes-section">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching recipes: {error.message}</p>}
        {data && (
          <div>
            {data.getRecipesByIngredients.map((recipe) => (
              <div key={recipe.id} className="recipe-item">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <img src={recipe.image} alt={recipe.title} />
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Instructions</h4>
                <p>{recipe.instructions}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fridge;
