import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import DrinkRecipesDetails from '../pages/DrinkRecipesDetails';
import { drinksResponse } from './mocks/drinkMocks';

const justDrinkMockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinksResponse),
    }));
};

describe('Testa a página de receitas feitas', () => {
  beforeEach(() => jest.clearAllMocks());

  justDrinkMockFetch();
  it('Verifica se a página contém os elementos esperados', async () => {
    await act(async () => {
      renderWithRouter(<DrinkRecipesDetails />);
    });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const startBtn = screen.getByTestId('start-recipe-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    await screen.findByText('Iniciar Receita');
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });
});