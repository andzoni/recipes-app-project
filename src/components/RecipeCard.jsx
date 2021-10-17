import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  max-width: 45vw;
`;

function RecipeCard({ title, src, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Img src={ src } alt={ title } data-testid={ `${index}-card-img` } />
      <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
    </div>
  );
}

const { string } = PropTypes;

RecipeCard.propTypes = {
  index: string,
  title: string,
  url: string,
}.isRequired;

export default RecipeCard;
