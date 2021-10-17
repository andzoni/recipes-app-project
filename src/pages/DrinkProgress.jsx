import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import {
  addIngredientInProgressRecipe,
  removeIngredientInProgressRecipe,
  getIngredientsList,
  setDoneRecipe,
} from '../services/localStorageFunctions';
import { fetchDrinkDetails } from '../services/fetchRecipes';

const Main = styled.div`
    li{
      list-style: none;
  };
  .checked {
    text-decoration: line-through solid black;
  };
`;

const Img = styled.img`
  max-width: 100vw;
  `;

function DrinkProgress() {
  const [drinkRecipeDetails, setDrinkRecipeDetails] = useState({});
  const [ingredientsChecked, setIngredientsChecked] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
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
  }, [id]);

  useEffect(() => {
    fetchDrinkDetails(id, setDrinkRecipeDetails);
  }, [id, ingredientsChecked]);

  useEffect(() => {
    getIngredientsList(id, 'bebida', setIngredientsList);
  }, [id, ingredientsChecked]);

  useEffect(() => {
    if (ingredientsList) {
      setIngredientsChecked(ingredientsList.length);
    }
  }, [ingredientsList]);

  function ingredients() {
    // pega as chaves strIngredientXX
    const keys = Object.keys(drinkRecipeDetails)
      .filter((key) => key.includes('strIngredient'));
    // pega os valores das chaves (que são os ingredientes), e reotrna um array só com os ingredientes
    const inProgressIngredients = keys.map((key) => drinkRecipeDetails[key]);
    // retorna só os valores que não são nulos
    return (inProgressIngredients.filter((ingredient) => ingredient
      && ingredient !== null));
  }

  // faz a mesma coisa da função de cima, porém pegando as medidas agora
  const measures = () => {
    const measuresKeys = Object.keys(drinkRecipeDetails)
      .filter((key) => key.includes('strMeasure'));
    const measuresList = measuresKeys.map((measure) => drinkRecipeDetails[measure]);

    return measuresList.filter((measure) => measure && measure !== null);
  };

  function allChecked() {
    return ingredientsChecked < ingredients().length;
  }

  const handleClickToFinish = () => {
    setDoneRecipe(drinkRecipeDetails, 'bebida');
    removeIngredientInProgressRecipe(id, 0, 'cocktails', true);
    history.push('/receitas-feitas');
  };

  const mainButton = () => (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleClickToFinish }
      disabled={ allChecked() }
    >
      Finalizar Receita
    </button>
  );

  const handleChange = (target, index) => {
    const { checked } = target;
    if (checked) {
      // adiciona ingrediente ao localStorage
      addIngredientInProgressRecipe(id, index, 'cocktails');
      setIngredientsChecked((prevState) => prevState + 1);
      target.parentElement.classList.add('checked');
    }
    if (!checked) {
      // remove ingrediente do localstorage
      removeIngredientInProgressRecipe(id, index, 'cocktails');
      setIngredientsChecked((prevState) => prevState - 1);
      target.parentElement.classList.remove('checked');
    }
  };

  const ingredientMeasures = measures();

  return (
    <Main>
      <section>
        <Img
          className="recipeImage"
          src={ drinkRecipeDetails.strDrinkThumb }
          alt="Imagem da bebida"
          data-testid="recipe-photo"
        />
        <div>
          <h2 data-testid="recipe-title">{ drinkRecipeDetails.strDrink }</h2>
          <h3 data-testid="recipe-category">{ drinkRecipeDetails.strAlcoholic }</h3>
        </div>
        <div>
          <ShareButton id={ id } type="bebida" testID="regular" />
          <LikeButton id={ id } recipe={ drinkRecipeDetails } />
        </div>
      </section>

      <section>
        <h3>Ingredientes</h3>
        <ul>
          {
            ingredients().map((ingredient, index) => (
              <li
                key={ `${ingredient}-${index}` }
              >
                <label
                  htmlFor={ `ingredientCheck-${index}` }
                  data-testid={ `${index}-ingredient-step` }
                  className={ (ingredientsList && ingredientsList.includes(`${index}`))
                     && 'checked' }
                >
                  <input
                    type="checkbox"
                    id={ `ingredientCheck-${index}` }
                    onChange={ ((e) => handleChange(e.target, index)) }
                    checked={ ingredientsList && ingredientsList.includes(`${index}`) }
                    value={ ingredient }
                    name={ ingredient }
                  />
                  {`${ingredient} - ${ingredientMeasures[index]}`}
                </label>
              </li>
            ))
          }
        </ul>
        <p data-testid="instructions">{drinkRecipeDetails.strInstructions}</p>
      </section>
      { mainButton() }
    </Main>
  );
}

export default DrinkProgress;
