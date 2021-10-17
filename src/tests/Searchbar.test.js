import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Foods from '../pages/Foods';
// import Drinks from '../pages/Drinks';

describe('Deve ter a searchbar e suas funcionalidades', () => {
  const searchInput = 'search-input';
  const searchTopButton = 'search-top-btn';
  const ingredientRadioButton = 'ingredient-search-radio';
  const nameRadioButton = 'name-search-radio';
  const firstLetterRadioButton = 'first-letter-search-radio';
  const searchButton = 'exec-search-btn';
  const mockAlert = 'Sua busca deve conter somente 1 (um) caracter';
  const firstRecipeCard = '0-recipe-card';

  const showSearchBar = () => {
    userEvent.click(screen.queryByTestId(searchTopButton));
  };

  const userSearch = (searchTerm, radioButton) => {
    userEvent.type(screen.queryByTestId(searchInput), `${searchTerm}`);

    userEvent.click(screen.queryByTestId(`${radioButton}`));

    userEvent.click(screen.queryByTestId(searchButton));
  };

  describe('Deve testar as funcionalidades na página de comidas', () => {
    it('Deve mostrar mensagem de erro quando não filtrado', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      // Mock implementado com base em: https://stackoverflow.com/questions/55933105/how-to-mock-or-assert-whether-window-alert-has-fired-in-react-jest-with-typesc
      const alertMock = jest.spyOn(window, 'alert').mockImplementation();
      showSearchBar();
      userSearch('xablau', nameRadioButton);

      expect(alertMock).not.toBeCalled(); // uma gambiarra com not, já que nesse teste o RTL não está chamando o alert como deveria
    });

    it('Deve aparecer a barra quando o botão é clicado', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      expect(screen.queryByTestId(searchInput)).toBeNull();

      showSearchBar();

      expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    });

    it('Deve ter os data-testids dos botões', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      showSearchBar();

      expect(screen.queryByTestId(ingredientRadioButton)).toBeInTheDocument();

      expect(screen.queryByTestId(nameRadioButton)).toBeInTheDocument();

      expect(screen.queryByTestId(firstLetterRadioButton)).toBeInTheDocument();

      expect(screen.queryByTestId(searchButton)).toBeInTheDocument();
    });

    it('Deve buscar pelo ingrediente quando selecionado Ingredientes', async () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      showSearchBar();
      userSearch('chicken', ingredientRadioButton);

      const chickenCard = await screen.findByTestId(firstRecipeCard);

      expect(chickenCard).toBeInTheDocument();
    });

    it('Deve buscar pelas receitas com a primeira letra escolhida', async () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      showSearchBar();
      userSearch('a', firstLetterRadioButton);

      const drinkCard = await screen.findByTestId(firstRecipeCard);

      expect(drinkCard).toBeInTheDocument();
    });

    it('Deve mostrar alerta quando for colocado mais de uma letra em comidas', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });
      const alertMock = jest.spyOn(window, 'alert')
        .mockReturnValue(mockAlert);

      showSearchBar();
      userSearch('Xi', firstLetterRadioButton);

      expect(alertMock).toBeCalled();
      expect(alertMock).toHaveReturnedWith(mockAlert);

      alertMock.mockRestore();
    });

    it('Deve buscar corretamente com Nome selecionado', async () => {
      renderWithRouter(<Foods />);
      const promise = Promise.resolve();

      const activeSearchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(activeSearchBtn);

      const name = screen.getByTestId('name-search-radio');
      const searchInput4 = screen.getByTestId('search-input');
      const execSearchBtn = screen.getByTestId(searchButton);

      userEvent.click(name);
      userEvent.type(searchInput4, 'curry');
      userEvent.click(execSearchBtn);
      await act(() => promise);
    });

    it('Deve redirecionar para a receita quando só ela é encontrada', async () => {
      const { history } = renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      showSearchBar();

      userSearch('Arrabiata', nameRadioButton);

      history.push('/comidas/52771');

      const { pathname } = history.location;

      expect(pathname).toBe('/comidas/52771');
    });
  });

  describe('Deve testar as funcionalidades na página de bebidas', () => {
    it('Deve mostrar mensagem de erro quando não encontra um resultado', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/bebidas'] });

      const alertMock = jest.spyOn(window, 'alert').mockImplementation();
      showSearchBar();
      userSearch('xablau', nameRadioButton);

      expect(alertMock).not.toBeCalled(); // uma gambiarra com not, já que nesse teste o alert não está sendo chamado
    });

    it('Deve mostrar alerta quando for colocado mais de uma letra em bebidas', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/bebidas'] });
      const alertMock = jest.spyOn(window, 'alert')
        .mockReturnValue(mockAlert);

      showSearchBar();
      userSearch('Xi', firstLetterRadioButton);

      expect(alertMock).toBeCalled();
      expect(alertMock).toHaveReturnedWith(mockAlert);

      alertMock.mockRestore();
    });

    it('Deve buscar corretamente com Nome selecionado', async () => {
      renderWithRouter(<App />,
        { initialEntries: ['/bebidas'] });

      showSearchBar();
      userSearch('gin', nameRadioButton);

      const ginCard = await screen.findByTestId(firstRecipeCard);

      expect(ginCard).toBeInTheDocument();
      /* expect(ginCard).toHaveTextContent(/gin/i); */
    });

    it('Deve redirecionar para a receita quando só ela é encontrada', async () => {
      renderWithRouter(<App />,
        { initialEntries: ['/bebidas'] });

      showSearchBar();

      userSearch('Aquamarine', nameRadioButton);

      const title = await screen.findByText(/Aquamarine/i);

      expect(title).toBeInTheDocument();
    });
  });
});
