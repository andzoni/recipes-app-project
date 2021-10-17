import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, cleanup } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { FoodsExplorer } from '../pages';

const exploreByIngredient = 'explore-by-ingredient';
const exploreByArea = 'explore-by-area';
const exploreSurprise = 'explore-surprise';

describe('Testa a página MealsExplorer', () => {
  beforeEach(cleanup);
  it('Apresenta todos os elementos esperados na página', async () => {
    await act(async () => {
      renderWithRouter(<FoodsExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient)).toBeInTheDocument();
    expect(screen.getByTestId(exploreByArea)).toBeInTheDocument();
    expect(screen.getByTestId(exploreSurprise)).toBeInTheDocument();
  });

  it('Os botões de exploração apresentam o conteúdo esperado', async () => {
    await act(async () => {
      renderWithRouter(<FoodsExplorer />);
    });
    expect(screen.getByTestId(exploreByIngredient).innerHTML).toBe('Por Ingredientes');
    expect(screen.getByTestId(exploreByArea).innerHTML).toBe('Por Local de Origem');
    expect(screen.getByTestId(exploreSurprise).innerHTML).toBe(' Me Surpreenda!');
  });

  it('O botão de explorar `Por Ingredientes` redireciona corretamente', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<FoodsExplorer />);
      userEvent.click(screen.getByTestId(exploreByIngredient));
      const url = history.location.pathname;
      expect(url).toBe('/explorar/comidas/ingredientes');
    });
  });

  it('O botão de explorar `Por Local de Origem` redireciona corretamente', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<FoodsExplorer />);
      userEvent.click(screen.getByTestId(exploreByArea));
      const url = history.location.pathname;
      expect(url).toBe('/explorar/comidas/area');
    });
  });
});
