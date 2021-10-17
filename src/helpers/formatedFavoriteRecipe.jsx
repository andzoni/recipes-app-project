const formatedFavoriteRecipe = (favRecipe) => {
  if (favRecipe.strMeal) {
    const favFoodRecipe = {
      id: favRecipe.idMeal,
      type: 'comida',
      area: favRecipe.strArea,
      category: favRecipe.strCategory,
      alcoholicOrNot: '',
      name: favRecipe.strMeal,
      image: favRecipe.strMealThumb,
    };
    return favFoodRecipe;
  }
  if (favRecipe.strDrink) {
    const favDrinkRecipe = {
      id: favRecipe.idDrink,
      type: 'bebida',
      area: '',
      category: favRecipe.strCategory,
      alcoholicOrNot: favRecipe.strAlcoholic,
      name: favRecipe.strDrink,
      image: favRecipe.strDrinkThumb,
    };
    return favDrinkRecipe;
  }
};

export default formatedFavoriteRecipe;
