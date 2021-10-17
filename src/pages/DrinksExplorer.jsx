import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fetchRandomDrinkRecipe } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components';

const Main = styled.main`
  margin-top: 68px;
  form{
    margin: 0 10px;
  }
`;

const DrinksExplorer = () => {
  const [surpriseRecipe, setSurpriseRecipe] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      setSurpriseRecipe(await fetchRandomDrinkRecipe());
    };

    fetchRandomRecipe();
  }, []);

  return (
    <Main>

      <Header title="Explorar Bebidas" />

      <Button
        buttonText="Por Ingredientes"
        id="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      />

      <Button
        buttonText=" Me Surpreenda!"
        id="explore-surprise"
        onClick={ () => history.push(`/bebidas/${surpriseRecipe}`) }
      />

      <Footer />

    </Main>
  );
};

export default DrinksExplorer;
