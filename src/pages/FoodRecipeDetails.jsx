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
import { fetchFoodDetails, fetchFoodRecomendations } from '../services/fetchRecipes';

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

const FoodRecipeDetails = () => {
  const [foodRecipeDetails, setFoodRecipeDetails] = useState({});
  const [recomended, setRecomended] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchFoodDetails(id, setFoodRecipeDetails);
    fetchFoodRecomendations(setRecomended);
    setInProgress(isThisRecipeInProgress(id, 'comida'));
    setVisibility(!isThisRecipeDone(id));
  }, [id]);

  const embedVideo = () => {
    const URL = foodRecipeDetails.strYoutube;
    if (!URL) return <p>Sem vídeo</p>;
    const embed = URL.replace('watch?v=', 'embed/');
    return (
      <iframe
        width="360"
        data-testid="video"
        src={ embed }
        title="YouTube video player"
        allow="accelerometer; autoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  const ingredients = () => {
    const keys = Object.keys(foodRecipeDetails)
      .filter((key) => key.includes('strIngredient'));
    const ingredientsList = keys.map((key) => foodRecipeDetails[key]);
    return ingredientsList.filter((ingredient) => ingredient && ingredient !== '');
  };

  const measures = () => {
    const measuresKeys = Object.keys(foodRecipeDetails)
      .filter((key) => key.includes('strMeasure'));
    const measuresList = measuresKeys.map((measure) => foodRecipeDetails[measure]);

    return measuresList.filter((measure) => measure && measure !== '');
  };

  const mainButton = () => {
    if (visibility) {
      return (
        <Link
          to={ ({
            pathname: `${id}/in-progress`,
            state: foodRecipeDetails,
          }) }
        >
          <button
            className="continueBtn"
            type="button"
            data-testid="start-recipe-btn"
          >
            { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
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
          src={ foodRecipeDetails.strMealThumb }
          alt="Imagem da comida"
          data-testid="recipe-photo"
        />
        <CardHeader>

          <div>
            <h2 data-testid="recipe-title">{ foodRecipeDetails.strMeal }</h2>
            <h3 data-testid="recipe-category">{ foodRecipeDetails.strCategory }</h3>
          </div>

          <Buttons>
            <ShareButton id={ id } type="comidas" testID="regular" />
            <LikeButton id={ id } recipe={ foodRecipeDetails } />
          </Buttons>

        </CardHeader>
      </section>
      <RecipeDetails
        instructions={ foodRecipeDetails.strInstructions }
        ingredients={ ingredients() }
        ingredientMeasures={ measures() }
        video={ embedVideo() }
        isFoodRecipe
      />
      <RecomendationsBoard>
        {
          recomended.map((drinkRecipe, idx) => (
            <Link
              to={ `/bebidas/${drinkRecipe.idDrink}` }
              key={ `${drinkRecipe}${idx}` }
              className="recipeCard"
            >
              <MasterCard
                src={ drinkRecipe.strDrinkThumb }
                index={ idx }
                key={ `${drinkRecipe}-${idx}` }
                cardType="drinkRecomended"
                title={ drinkRecipe.strDrink }
                category={ drinkRecipe.strAlcoholic }
              />
            </Link>
          ))
        }
      </RecomendationsBoard>
      { mainButton() }
    </Main>
  );
};

export default FoodRecipeDetails;
