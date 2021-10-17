import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import styled from 'styled-components';

import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import MasterCard from '../components/MasterCard';
import RecipeDetails from '../components/RecipeDetails';
import {
  isThisRecipeDone,
  isThisRecipeInProgress,
} from '../services/localStorageFunctions';
import { fetchDrinkDetails, fetchDrinkRecomendations } from '../services/fetchRecipes';

const Main = styled.main`
  /* display: flex; */
  margin-top: 68px;
  .continueBtn {
    position: fixed;
    bottom: 0;
  }
`;

const Img = styled.img`
  max-width: 100vw;
`;

const RecomendationsBoard = styled.div`
  /* width: 100%; */
  display: flex;
  overflow-x: scroll;
  margin: 10px 10px;

  img {
    border: 1px solid black;
    border-radius: 4px;
    padding: 5px;
    max-width: 42vw;
    margin-right: 10px;
    box-shadow: 1px 1px 1px #16161660;
  }

  img:hover {
    background-color: #161616;
  }
  
`;

const Buttons = styled.div`
  display: flex;
  margin: 10px;

  button {
    border: none;
    background: none;
    width: 35px;
    height: 35px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DrinkRecipesDetails = () => {
  const [drinkRecipeDetails, setDrinkRecipeDetails] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchDrinkDetails(id, setDrinkRecipeDetails);
    fetchDrinkRecomendations(setRecomended);
    setInProgress(isThisRecipeInProgress(id, 'bebida'));
    setVisibility(!isThisRecipeDone(id));
  }, [id]);

  const ingredients = () => {
    const keys = Object.keys(drinkRecipeDetails)
      .filter((key) => key.includes('strIngredient'));
    const listIngredients = keys.map((key) => drinkRecipeDetails[key]);

    return listIngredients.filter((ingredient) => ingredient && ingredient !== null);
  };

  const measures = () => {
    const measuresKeys = Object.keys(drinkRecipeDetails)
      .filter((key) => key.includes('strMeasure'));
    const measuresList = measuresKeys.map((measure) => drinkRecipeDetails[measure]);

    return measuresList.filter((measure) => measure && measure !== null);
  };

  const mainButton = () => {
    if (visibility) {
      return (
        <Link
          to={ ({
            pathname: `${id}/in-progress`,
            state: drinkRecipeDetails,
          }) }
        >
          <button
            className="continueBtn"
            type="button"
            data-testid="start-recipe-btn"
          >
            { inProgress ? 'Continuar Receita' : 'Iniciar   Receita' }
          </button>
        </Link>
      );
    }
    return null;
  };

  return (
    <Main>
      <section>
        <Img
          className="recipeImage"
          src={ drinkRecipeDetails.strDrinkThumb }
          alt="Imagem da bebida"
          data-testid="recipe-photo"
        />
        <CardHeader>

          <div>
            <h2 data-testid="recipe-title">{ drinkRecipeDetails.strDrink }</h2>
            <h3 data-testid="recipe-category">{ drinkRecipeDetails.strAlcoholic }</h3>
          </div>

          <Buttons>
            <ShareButton id={ id } type="bebidas" testID="regular" />
            <LikeButton id={ id } recipe={ drinkRecipeDetails } />
          </Buttons>

        </CardHeader>
      </section>
      <RecipeDetails
        instructions={ drinkRecipeDetails.strInstructions }
        ingredients={ ingredients() }
        ingredientMeasures={ measures() }
        isFoodRecipe
      />
      <RecomendationsBoard>
        {
          recomended.map((foodRecipe, idx) => (
            <Link
              to={ `/comidas/${foodRecipe.idMeal}` }
              key={ `${foodRecipe}${idx}` }
              className="recipeCard"
            >
              <MasterCard
                src={ foodRecipe.strMealThumb }
                index={ idx }
                key={ `${foodRecipe}-${idx}` }
                cardType="foodRecomended"
                title={ foodRecipe.strMeal }
                category={ foodRecipe.strCategory }
              />
            </Link>
          ))
        }
      </RecomendationsBoard>
      { mainButton() }
    </Main>
  );
};

export default DrinkRecipesDetails;
