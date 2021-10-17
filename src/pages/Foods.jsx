import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MasterCard from '../components/MasterCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodSearchBar from '../components/FoodSearchBar';
import FilterRecipes from '../components/FilterRecipes';
import {
  fetchAllFoodRecipes,
  fetchFoodRecipesByCategory,
  fetchRecipesByIngredients,
} from '../services/fetchRecipes';

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const Main = styled.main`
  margin-top: 68px;
  form{
    margin: 0 10px;
  }
  margin-bottom: 68px;
`;

const Foods = () => {
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [prevCategory, setCategory] = useState('All');

  const { state } = useLocation();

  useEffect(() => {
    const fetchRecipes = async () => (
      state
        ? fetchRecipesByIngredients(setFoodRecipes, state, 'meals')
        : fetchAllFoodRecipes(setFoodRecipes)
    );

    fetchRecipes();
  }, [state]);

  const handleFilter = ({ target: { name } }) => {
    switch (name) {
    case 'All':
      fetchAllFoodRecipes(setFoodRecipes);
      break;
    case prevCategory:
      fetchAllFoodRecipes(setFoodRecipes);
      setCategory('All');
      break;
    default:
      fetchFoodRecipesByCategory(name, setFoodRecipes);
      setCategory(name);
      break;
    }
  };

  const filterRecipes = (
    <FilterRecipes
      pageTitle="Comidas"
      handleFilter={ handleFilter }
    />
  );

  const foodSearchBar = (
    <FoodSearchBar
      setSearchBarStatus={ setSearchBarStatus }
      setFoodRecipes={ setFoodRecipes }
    />
  );

  return (
    <Main>
      <Header title="Comidas" setSearchBarStatus={ setSearchBarStatus } />
      {
        searchBarStatus ? foodSearchBar : filterRecipes
      }
      <CardList className="recipeList">
        {
          foodRecipes.map((foodRecipe, index) => (
            <Link
              to={ `comidas/${foodRecipe.idMeal}` }
              key={ `${foodRecipe}${index}` }
              className="recipeCard"
            >
              <MasterCard
                index={ index }
                src={ foodRecipe.strMealThumb }
                cardType="foodRecipe"
                title={ foodRecipe.strMeal }
                className="recipeCard"
              />
            </Link>
          ))
        }
      </CardList>
      <Footer />
    </Main>
  );
};

export default Foods;
