const LENGTH = 12;
const RECOMENDATIONS_LIMIT = 6;

const AREAS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FILTER_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const ALL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const FOOD_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const DRINK_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const FOOD_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const RANDOM_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export async function fetchAllFoodRecipes(setFoodRecipes) {
  const response = await fetch(ALL_FOODS);
  const result = await response.json();
  setFoodRecipes(result.meals.slice(0, LENGTH));
}

export async function fetchAllDrinkRecipes(setDrinkRecipes) {
  const response = await fetch(ALL_DRINKS);
  const result = await response.json();
  setDrinkRecipes(result.drinks.slice(0, LENGTH));
}

export async function fetchFoodRecipesByCategory(category, setFoodRecipes) {
  const response = await fetch(`${FOODS_BY_CATEGORY}${category}`);
  const result = await response.json();
  setFoodRecipes(result.meals.slice(0, LENGTH));
}

export async function fetchDrinkRecipesByCategory(category, setDrinkRecipes) {
  const response = await fetch(`${DRINKS_BY_CATEGORY}${category}`);
  const result = await response.json();
  setDrinkRecipes(result.drinks.slice(0, LENGTH));
}

export const fetchRandomFoodRecipe = async () => {
  const response = await fetch(RANDOM_FOOD);
  const result = await response.json();
  return result.meals[0].idMeal;
};

export const fetchRandomDrinkRecipe = async () => {
  const response = await fetch(RANDOM_DRINK);
  const result = await response.json();
  return result.drinks[0].idDrink;
};

export const fetchFoodDetails = async (id, setFoodRecipeDetails) => {
  const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(END_POINT);
  const result = await response.json();
  setFoodRecipeDetails(result.meals[0]);
};

export const fetchDrinkDetails = async (id, setDrinkRecipeDetails) => {
  const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(END_POINT);
  const result = await response.json();
  setDrinkRecipeDetails(result.drinks[0]);
};

export const fetchFoodRecomendations = async (setRecomended) => {
  const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(END_POINT);
  const results = await response.json();
  setRecomended(results.drinks.slice(0, RECOMENDATIONS_LIMIT));
};

export const fetchDrinkRecomendations = async (setRecomended) => {
  const END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(END_POINT);
  const results = await response.json();
  setRecomended(results.meals.slice(0, RECOMENDATIONS_LIMIT));
};

export async function fetchIngredients(type) {
  if (type === 'comidas') {
    const response = await fetch(FOOD_INGREDIENTS);
    const result = await response.json();

    return result.meals.slice(0, LENGTH);
  }
  if (type === 'bebidas') {
    const response = await fetch(DRINK_INGREDIENTS);
    const result = await response.json();

    return result.drinks.slice(0, LENGTH);
  }
}

export async function fetchRecipesByIngredients(setFoodRecipes, state, type) {
  let RECIPE_BY_INGREDIENT = '';
  if (type === 'meals') RECIPE_BY_INGREDIENT = FOOD_BY_INGREDIENT;
  if (type === 'drinks') RECIPE_BY_INGREDIENT = DRINK_BY_INGREDIENT;
  const response = await fetch(`${RECIPE_BY_INGREDIENT}${state}`);
  const result = await response.json();
  setFoodRecipes(result[type].slice(0, LENGTH));
}

export async function fetchFoodRecipeOrigins() {
  const response = await fetch(AREAS_ENDPOINT);
  const result = await response.json();

  return result.meals;
}

export async function fetchFoodsByOrigin(setFoodRecipes, origin) {
  const response = await fetch(`${FILTER_BY_AREA}${origin}`);
  const result = await response.json();

  setFoodRecipes(result.meals.slice(0, LENGTH));
}
