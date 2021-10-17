import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { isThisRecipeFavorited } from '../services/localStorageFunctions';
import formatedFavoriteRecipe from '../helpers/formatedFavoriteRecipe';
import { blackHeartIcon, whiteHeartIcon } from '../images';

function LikeButton({ recipe, id, favOrDone = false, idx, refreshFav }) {
  const [heartType, setHeartType] = useState(whiteHeartIcon);
  const [heartAlt, setHeartAlt] = useState('White Heart');

  const addToFavorites = (thisRecipe) => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const oneMoreFav = [...favoriteRecipes, thisRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(oneMoreFav));
    } localStorage.setItem('favoriteRecipes', JSON.stringify([thisRecipe]));
  };

  const removeFromFavorites = () => {
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favorites.length);
      const lessOneFav = favorites.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(lessOneFav));
    }
  };

  const handleClick = () => {
    // se esta receita estiver com coração branco, adiciona ela no localStorage e trnasforma o coração em preto
    if (heartType === whiteHeartIcon) {
      addToFavorites(formatedFavoriteRecipe(recipe));
      setHeartType(blackHeartIcon);
      setHeartAlt('Black Heart');
    }
    // se esta receita estiver com coração preto, remove ela dos favoritos e transforma o coração em branco
    if (heartType === blackHeartIcon) {
      removeFromFavorites();
      setHeartType(whiteHeartIcon);
      setHeartAlt('White Heart');
      if (refreshFav) refreshFav();
    }
  };

  useEffect(() => {
    if (isThisRecipeFavorited(id)) {
      setHeartType(blackHeartIcon);
    }
  }, [heartType, id]);

  return (
    <section>
      <input
        type="image"
        data-testid={ favOrDone ? `${idx}-horizontal-favorite-btn` : 'favorite-btn' }
        src={ heartType }
        alt={ `${heartAlt}` }
        onClick={ handleClick }
        className="favBtn"
      />
    </section>
  );
}

const { object, string, bool } = PropTypes;

LikeButton.propTypes = {
  recipe: object,
  id: string,
  favOrDone: bool,
  idx: string,
}.isRequired;

export default LikeButton;
