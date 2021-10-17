import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fetchRandomFoodRecipe } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components';

const Main = styled.main`
  margin-top: 68px;
  form{
    margin: 0 10px;
  }
`;

const FoodsExplorer = () => {
  const [surpriseRecipe, setSurpriseRecipe] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      setSurpriseRecipe(await fetchRandomFoodRecipe());
    };

    fetchRandomRecipe();
  }, []);

  return (
    <Main>

      <Header title="Explorar Comidas" />

      <Button
        buttonText="Por Ingredientes"
        id="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      />

      <Button
        buttonText="Por Local de Origem"
        id="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      />

      <Button
        buttonText=" Me Surpreenda!"
        id="explore-surprise"
        onClick={ () => history.push(`/comidas/${surpriseRecipe}`) }
      />

      <Footer />

    </Main>
  );
};

export default FoodsExplorer;
