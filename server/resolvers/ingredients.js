const ingredientsResolvers = {
    Query: {
      getIngredients: async (_, { query }) => {
        try {
          const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${process.env.API_KEY}`);
          if (!response.ok) {
            throw new Error('Failed to fetch ingredients from Spoonacular API');
          }
          const data = await response.json();
          return data.results.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
            image: ingredient.image,
          }));
        } catch (error) {
          console.error('Error fetching ingredients from Spoonacular API:', error);
          throw new Error('Failed to fetch ingredients from Spoonacular API');
        }
      },
    },
  };
  
  module.exports = ingredientsResolvers;
  