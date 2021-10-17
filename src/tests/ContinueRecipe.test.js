import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import FoodRecipeDetails from '../pages/FoodRecipeDetails';

describe('testa render do botao', () => {
  it('testa renderizacao do botao Continue', () => {
    renderWithRouter(<FoodRecipeDetails pathname="/comidas/53026" />);
    const continueBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(continueBtn);
  });
});
