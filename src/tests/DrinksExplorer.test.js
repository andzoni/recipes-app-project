import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import DrinksExplorer from '../pages/DrinksExplorer';

const exploreByIngredient = 'explore-by-ingredient';
const exploreSurprise = 'explore-surprise';

describe('Testa a página MealsExplorer', () => {
  it('Apresenta todos os elementos esperados na página', async () => {
    await act(async () => {
      renderWithRouter(<DrinksExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient)).toBeInTheDocument();
    expect(screen.queryByTestId('explore-by-area')).not.toBeInTheDocument();
    expect(screen.getByTestId(exploreSurprise)).toBeInTheDocument();
  });

  it('Os botões de exploração apresentam o conteúdo esperado', async () => {
    await act(async () => {
      renderWithRouter(<DrinksExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient).innerHTML).toBe('Por Ingredientes');
    expect(screen.getByTestId(exploreSurprise).innerHTML).toBe(' Me Surpreenda!');
  });

  it('O botão de explorar por ingredientes redireciona corretamente', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<DrinksExplorer />);
      const btnExploreByIngredients = screen.getByTestId(exploreByIngredient);
      userEvent.click(btnExploreByIngredients);
      const url = history.location.pathname;
      expect(url).toBe('/explorar/bebidas/ingredientes');
    });
  });
});
