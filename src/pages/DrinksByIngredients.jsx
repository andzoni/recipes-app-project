import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MasterCard from '../components/MasterCard';
import { fetchIngredients } from '../services/fetchRecipes';

const Main = styled.main`
  margin-top: 68px;
  margin-bottom: 68px;
`;

const DrinksByIngredients = () => {
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    const fetchStorageIngredientes = async () => {
      setIngredients(await fetchIngredients('bebidas'));
    };
    fetchStorageIngredientes();
  }, []);

  const ingredientImage = (ingredientName) => {
    const DRINK_INGREDIENT_IMAGES = 'https://www.thecocktaildb.com/images/ingredients/';
    return `${DRINK_INGREDIENT_IMAGES}${ingredientName}-Small.png`;
  };
  return (
    <Main>
      <Header title="Explorar Ingredientes" />
      {
        ingredients ? ingredients.map((ingredient, index) => (
          <Link
            key={ `${ingredient.strIngredient1}${index}` }
            to={ ({
              pathname: '/bebidas',
              state: ingredient.strIngredient1,
            }) }
          >
            <MasterCard
              cardType="ingredient"
              index={ index }
              title={ ingredient.strIngredient1 }
              src={ ingredientImage(ingredient.strIngredient1) }
            />
          </Link>
        )) : <p>loading...</p>
      }
      <Footer />
    </Main>
  );
};

export default DrinksByIngredients;
