import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MasterCard from '../components/MasterCard';
import FoodSearchBar from '../components/FoodSearchBar';
import {
  fetchFoodRecipeOrigins,
  fetchFoodsByOrigin,
  fetchAllFoodRecipes,
} from '../services/fetchRecipes';

const Main = styled.main`
  margin-top: 68px;
  margin-bottom: 68px;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const FoodsExplorerByOrigin = () => {
  const [origins, setOrigins] = useState();
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [originChanged, setOriginChanged] = useState(false);

  useEffect(() => {
    const fetchOrigins = async () => {
      setOrigins(await fetchFoodRecipeOrigins());
    };
    fetchOrigins();
  }, []);

  useEffect(() => {
    if (selectedOrigin === 'All') {
      fetchAllFoodRecipes(setFoodRecipes);
    }
    if (originChanged && selectedOrigin !== 'All') {
      fetchFoodsByOrigin(setFoodRecipes, selectedOrigin);
    }
    setOriginChanged(false);
  }, [originChanged, selectedOrigin]);

  const handleChange = ({ target: { value } }) => {
    setSelectedOrigin(value);
    setOriginChanged(true);
  };

  const originsSelect = (
    <label htmlFor="area-select" className="explore-by-area-select-container">
      <select
        id="area-select"
        className="filterByOrigin"
        data-testid="explore-by-area-dropdown"
        value={ selectedOrigin }
        onChange={ handleChange }
      >
        <option
          value="All"
          className="originOption"
          data-testid="All-option"
        >
          All
        </option>
        {
          origins ? origins.map((area) => (
            <option
              key={ area.strArea }
              value={ area.strArea }
              className="originOption"
              data-testid={ `${area.strArea}-option` }
            >
              {area.strArea}
            </option>
          )) : null
        }
      </select>
    </label>
  );

  const foodSearchBar = (
    <FoodSearchBar
      setSearchBarStatus={ setSearchBarStatus }
      setFoodRecipes={ setFoodRecipes }
    />
  );

  return (
    <Main>
      <Header title="Explorar Origem" />
      { searchBarStatus ? foodSearchBar : originsSelect }
      <CardList className="recipeList">
        {
          foodRecipes.map((foodRecipe, index) => (
            <Link
              to={ `/comidas/${foodRecipe.idMeal}` }
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

export default FoodsExplorerByOrigin;
