import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetails(props) {
  const {
    ingredients,
    instructions,
    ingredientMeasures,
    video,
    isFoodRecipe,
  } = props;

  return (
    <section className="recipeDetails">
      <h3>Ingredientes</h3>
      <ul>
        {
          ingredients.map((ingredient, idx) => (
            <li
              key={ `${ingredient}-${idx}` }
              data-testid={ `${idx}-ingredient-name-and-measure` }
            >
              { ingredient }
              { ingredientMeasures[idx] }
            </li>
          ))
        }
      </ul>
      <h3>Instruções de Preparo</h3>
      <p data-testid="instructions">{ instructions }</p>
      { isFoodRecipe && video }
    </section>
  );
}

const { string, bool, array } = PropTypes;

RecipeDetails.propTypes = {
  ingredients: array,
  instructions: string,
  ingredientMeasures: array,
  video: string,
  isFoodRecipe: bool,
}.isRequired;

export default RecipeDetails;
