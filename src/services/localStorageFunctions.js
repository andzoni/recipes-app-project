export const isThisRecipeDone = (id) => {
  if (localStorage.getItem('doneRecipes')) {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    const thereIs = done.find((recipe) => recipe.id === id);
    // se existir aquela receita em done, então o botão iniciar tem que desaparecer., senão existir, então ele tem que aparecer (visibility === true)
    return thereIs;
  }
};

export function isThisRecipeInProgress(id, type) {
  if (localStorage.getItem('inProgressRecipes')) {
    const { meals, cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'comida') {
      return Object.keys(meals).some((key) => key === id);
    }
    if (type === 'bebida') {
      return Object.keys(cocktails).some((key) => key === id);
    }
  }
}

export function setDoneRecipe(recipe, typ) {
  const done = JSON.parse(localStorage.doneRecipes);
  localStorage.setItem('doneRecipes', JSON.stringify([
    ...done,
    {
      id: typ === 'comida' ? recipe.idMeal : recipe.idDrink,
      // type: comida-ou-bebida,
      type: typ === 'comida' ? 'comida' : 'bebida',
      // area: area-da-receita-ou-texto-vazio,
      area: recipe.strArea ? recipe.strArea : '',
      // category: categoria-da-receita-ou-texto-vazio,
      category: recipe.strCategory ? recipe.strCategory : '',
      // alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
      alcoholicOrNot: recipe.strAlcoolic ? recipe.strAlcoholic : '',
      // name: nome-da-receita,
      name: typ === 'comida' ? recipe.strMeal : recipe.strDrink,
      // image: imagem-da-receita,
      image: typ === 'comida' ? recipe.strMealThumb : recipe.strDrinkThumb,
      // doneDate: quando-a-receita-foi-concluida,
      doneDate: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      // tags: array-de-tags-da-receita-ou-array-vazio
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    },
  ]));
}

export function isThisRecipeFavorited(id) {
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes.length > 1) {
      return favoriteRecipes.some((element) => element.id === id);
    }
  }
}

export function setDefaultLocalStorage(email) {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);

  if (!localStorage.user) {
    localStorage.setItem('user', JSON.stringify({ email }));
  }
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }),
    );
  }
  if (!localStorage.doneRecipes) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([]),
    );
  }
  if (!localStorage.favoriteRecipes) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([]),
    );
  }
}

export function getDoneRecipes(
  setDoneRecipes, setDoneFoodRecipes, setDoneDrinkecipes, setDisableFilters,
) {
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  if (done) {
    const donefoodRecipes = done.filter((doneRecipe) => doneRecipe.type === 'comida');
    const doneDrinkRecipes = done.filter((doneRecipe) => doneRecipe.type === 'bebida');
    if (donefoodRecipes) setDoneFoodRecipes(donefoodRecipes);
    if (doneDrinkRecipes) setDoneDrinkecipes(doneDrinkRecipes);
    setDoneRecipes(done);
    setDisableFilters(false);
  } else {
    setDisableFilters(false);
  }
}

export function getFavRecipes(
  setFavoritedRecipes, setFavFoodRecipes, setFavDrinkecipes, setDisableFilters,
) {
  const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (fav) {
    const favfoodRecipes = fav.filter((favRecipe) => favRecipe.type === 'comida');
    const favDrinkRecipes = fav.filter((favRecipe) => favRecipe.type === 'bebida');
    if (favfoodRecipes) setFavFoodRecipes(favfoodRecipes);
    if (favDrinkRecipes) setFavDrinkecipes(favDrinkRecipes);
    setFavoritedRecipes(fav);
    setDisableFilters(false);
  }
  if (fav.length < 1) {
    setDisableFilters(true);
  }
}

export function getIngredientsList(id, type, setIngredientsList) {
  if (localStorage.getItem('inProgressRecipes')) {
    const { meals, cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'comida') {
      const thisMeal = Object.keys(meals).filter((key) => key === id);
      return thisMeal.length === 0
        ? setIngredientsList(thisMeal)
        : setIngredientsList(meals[thisMeal]);
    }
    if (type === 'bebida') {
      const thisCocktail = Object.keys(cocktails).filter((key) => key === id);
      return thisCocktail.length === 0
        ? setIngredientsList([thisCocktail])
        : setIngredientsList(cocktails[thisCocktail]);
    }
  }
}

export function addIngredientInProgressRecipe(id, idx, type) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipesFromType = inProgressRecipes[type];
  if (Object.keys(recipesFromType).some((key) => key === id)) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: {
        ...recipesFromType,
        [id]: [...recipesFromType[id], `${idx}`],
      },
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: {
        ...recipesFromType,
        [id]: [`${idx}`],
      },
    }));
  }
}

export function removeIngredientInProgressRecipe(id, idx, type, finalized = false) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipesFromType = inProgressRecipes[type];

  if (recipesFromType[id].length === 1 || finalized) {
    delete (recipesFromType[id]);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...recipesFromType },
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: {
        ...recipesFromType,
        [id]: recipesFromType[id].filter((el) => el !== `${idx}`),
      },
    }));
  }
}
