import React, { useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Input } from '.';

function DrinkSearchBar({ setSearchBarStatus, setDrinkRecipes }) {
  const [textInput, setTextInput] = useState('');
  const [radioButton, setRadioButton] = useState('');
  const [loneDrink, setLoneDrink] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = ({ target: { name, value } }) => (
    name === 'textInput' ? setTextInput(value) : setRadioButton(value)
  );

  const searchBarAlert = () => (
    radioButton === 'firstLetter' && textInput.length > 1
      ? global.alert('Sua busca deve conter somente 1 (um) caracter')
      : global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
  );

  const handleEndPoints = () => {
    switch (radioButton) {
    case 'ingredient':
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${textInput}`;
    case 'name':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${textInput}`;
    case 'firstLetter':
      return textInput.length > 1
        ? searchBarAlert()
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${textInput}`;
    default:
      break;
    }
  };

  const getDrinkRecipes = async (event) => {
    event.preventDefault();
    const ENDPOINT = handleEndPoints();
    const RETURN_LENGTH = 12;
    const response = await (await fetch(ENDPOINT)).json();

    if (!response.drinks) return searchBarAlert();

    if (response.drinks.length === 1) {
      setLoneDrink(response.drinks[0].idDrink);
      setRedirect(true);
    } else {
      setDrinkRecipes(response.drinks.slice(0, RETURN_LENGTH));
    }

    setSearchBarStatus(false);
  };

  return (
    <section>
      {
        redirect && <Redirect to={ `/bebidas/${loneDrink}` } />
      }
      <form onSubmit={ getDrinkRecipes }>
        <Input
          type="text"
          id="search-input"
          className="searchInput"
          name="textInput"
          value={ textInput }
          placeHolder="Buscar receita"
          onChange={ handleChange }
        />
        <Input
          labelText="Ingrediente"
          type="radio"
          id="ingredient-search-radio"
          className="searchRadio"
          name="ingredient"
          value="ingredient"
          onChange={ handleChange }
          searchQuery={ radioButton }
        />
        <Input
          labelText="Nome"
          type="radio"
          id="name-search-radio"
          className="searchRadio"
          name="name"
          value="name"
          onChange={ handleChange }
          searchQuery={ radioButton }
        />
        <Input
          labelText="Primeira Letra"
          type="radio"
          id="first-letter-search-radio"
          className="searchRadio"
          name="firstLetter"
          value="firstLetter"
          onChange={ handleChange }
          searchQuery={ radioButton }
        />
        <Button
          type="submit"
          id="exec-search-btn"
          className="searchBarButton"
          buttonText="Buscar"
        />
      </form>
    </section>
  );
}

const { func } = PropTypes;

DrinkSearchBar.propTypes = {
  setSearchBarStatus: func,
  setDrinkRecipes: func,
}.isRequired;

export default DrinkSearchBar;
