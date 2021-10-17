import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MasterCard from '../components/MasterCard';
import FilterRecipes from '../components/FilterRecipes';
import { getDoneRecipes } from '../services/localStorageFunctions';

const Main = styled.main`
  margin-top: 68px;
  form{
    margin: 0 10px;
  }
`;

const DoneRecipes = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [disableFilters, setDisableFilters] = useState(true);
  const [doneFoodRecipes, setDoneFoodRecipes] = useState([]);
  const [doneDrinkRecipes, setDoneDrinkecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    getDoneRecipes(
      setDoneRecipes, setDoneFoodRecipes, setDoneDrinkecipes, setDisableFilters,
    );
  }, []);

  const handleFilter = ({ target: { name } }) => {
    switch (name) {
    case 'All':
      return setSelectedFilter('All');
    case 'Food':
      return setSelectedFilter('Food');
    case 'Drink':
      return setSelectedFilter('Drink');
    default:
      return setSelectedFilter('All');
    }
  };

  function renderDoneRecipes() {
    if (selectedFilter === 'All') {
      return (
        doneRecipes.map((doneRecipe, idx) => (
          <MasterCard
            cardType="doneRecipe"
            index={ idx }
            src={ doneRecipe.image }
            id={ doneRecipe.id }
            type={ doneRecipe.type }
            doneDate={ doneRecipe.doneDate }
            area={ doneRecipe.area }
            key={ idx }
            category={ doneRecipe.category }
            title={ doneRecipe.name }
            favOrDone="true"
            tags={ doneRecipe.tags }
            alcoholicOrNot={ doneRecipe.alcoholicOrNot }
            recipe={ doneRecipe }
            testID="horizontal"
          />
        ))
      );
    }
    if (selectedFilter === 'Food') {
      return (
        doneFoodRecipes.map((doneRecipe, idx) => (
          <MasterCard
            cardType="doneRecipe"
            index={ idx }
            src={ doneRecipe.image }
            id={ doneRecipe.id }
            type={ doneRecipe.type }
            key={ idx }
            doneDate={ doneRecipe.doneDate }
            area={ doneRecipe.area }
            category={ doneRecipe.category }
            title={ doneRecipe.name }
            favOrDone="true"
            tags={ doneRecipe.tags }
            alcoholicOrNot={ doneRecipe.alcoholicOrNot }
            recipe={ doneRecipe }
            testID="horizontal"
          />
        ))
      );
    }
    if (selectedFilter === 'Drink') {
      return (
        doneDrinkRecipes.map((doneRecipe, idx) => (
          <MasterCard
            cardType="doneRecipe"
            index={ idx }
            src={ doneRecipe.image }
            id={ doneRecipe.id }
            key={ idx }
            type={ doneRecipe.type }
            doneDate={ doneRecipe.doneDate }
            area={ doneRecipe.area }
            category={ doneRecipe.category }
            title={ doneRecipe.name }
            favOrDone="true"
            tags={ doneRecipe.tags }
            alcoholicOrNot={ doneRecipe.alcoholicOrNot }
            recipe={ doneRecipe }
            testID="horizontal"
          />
        ))
      );
    }
  }
  return (
    <Main>
      <Header title="Receitas Feitas" />
      { !disableFilters
        ? <FilterRecipes pageTitle="both" handleFilter={ handleFilter } />
        : <p>Parece que você não completou nenhuma receita</p> }
      { renderDoneRecipes() }
    </Main>
  );
};

export default DoneRecipes;
