import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Header', () => {
  const hasNoHeader = () => {
    const headerTitle = screen.queryByRole('navigation', {
      name: 'xablau' });
    const profileInput = screen.queryByRole('img', {
      name: /profile icon/i });
    const searchInput = screen.queryByRole('img', {
      name: /botão de busca/i });

    expect(headerTitle).toBe(null);
    expect(profileInput).toBe(null);
    expect(searchInput).toBe(null);
  };

  const hasHeader = (title, hasSearch = true) => {
    const headerTitle = screen.getByRole('heading', {
      Text: title });
    const profileInput = screen.getByTestId('profile-top-btn');
    const searchInput = hasSearch ? screen.getByTestId('search-top-btn') : null;

    expect(headerTitle).toBeInTheDocument();
    expect(profileInput).toBeInTheDocument();

    if (!searchInput) {
      expect(searchInput).not.toBeInTheDocument();
    } else {
      expect(searchInput).toBeInTheDocument();
    }
  };

  const searchInput = 'search-input';
  const searchTopButton = 'search-top-btn';

  describe('Exibe o header em cada página', () => {
    it('Deve ter os elementos em Comidas', () => {
      renderWithRouter(<App />, { initialEntries: ['/comidas'] });

      hasHeader('Comidas');
    });

    it('Deve ter os elementos em Bebidas', () => {
      renderWithRouter(<App />, { initialEntries: ['/bebidas'] });

      hasHeader('Bebidas');
    });

    it('Não deve ter o header nos detalhes de bebida', () => {
      renderWithRouter(<App />, { initialEntries: ['/bebidas/178319'] });

      hasNoHeader();
    });

    it('Não deve ter o header nos detalhes de comida', () => {
      renderWithRouter(<App />, { initialEntries: ['/comidas/52771'] });

      hasNoHeader();
    });

    it('Não tem header na tela de receita em processo de comida', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas/52771/in-progress'] });

      hasNoHeader();
    });

    it('Não tem header na tela de receita em processo de bebida', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/bebidas/178319/in-progress'] });

      hasNoHeader();
    });

    it('Não tem header na tela de receita em processo de bebida', () => {
      renderWithRouter(<App />, { initialEntries: ['/explorar'] });

      hasHeader('Explorar', false);
    });

    it('O header tem os ícones corretos na tela de explorar comidas', () => {
      renderWithRouter(<App />, { initialEntries: ['/explorar/comidas'] });

      hasHeader('Explorar Comidas', false);
    });

    it('O header tem os ícones corretos na tela de explorar bebidas', () => {
      renderWithRouter(<App />, { initialEntries: ['/explorar/bebidas'] });

      hasHeader('Explorar Bebidas', false);
    });

    it('O header tem os ícones corretos em explorar comidas por ingrediente', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/explorar/comidas/ingredientes'] });

      hasHeader('Explorar Ingredientes', false);
    });

    it('O header tem os ícones corretos em explorar bebidas por ingrediente', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/explorar/bebidas/ingredientes'] });

      hasHeader('Explorar Ingredientes', false);
    });

    it('Deve ter os ícones corretos em explorar comidas por local de origem', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/explorar/comidas/area'] });

      hasHeader('Explorar Origem', false);
    });

    it('O header tem os ícones corretos na tela de perfil', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/perfil'] });

      hasHeader('Perfil', false);
    });

    it('O header tem os ícones corretos na tela de receitas favoritas', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/receitas-favoritas'] });

      hasHeader('Receitas Favoritas', false);
    });

    it('O header tem os ícones corretos na tela de receitas favoritas', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/receitas-feitas'] });

      hasHeader('Receitas Feitas', false);
    });
  });

  describe('Testa o funcionamento dos botões', () => {
    it('Deve redirecionar a pessoa usuária para a tela de perfil', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      userEvent.click(screen.getByTestId('profile-top-btn'));

      const headerTitle = screen.getByRole('heading', {
        name: 'Perfil' });

      expect(headerTitle).toBeInTheDocument();
    });
  });

  describe('Testa a barra de pesquisa', () => {
    it('Deve mostrar a barra de busca quando é clicado', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      expect(screen.queryByTestId(searchInput)).toBeNull();

      userEvent.click(screen.queryByTestId(searchTopButton));

      expect(screen.queryByTestId(searchInput)).toBeInTheDocument();
    });

    it('Deve sumir a barra de busca quando o botão é clicado novamente', () => {
      renderWithRouter(<App />,
        { initialEntries: ['/comidas'] });

      userEvent.click(screen.queryByTestId(searchTopButton));

      expect(screen.queryByTestId(searchInput)).toBeInTheDocument();

      userEvent.click(screen.queryByTestId(searchTopButton));

      expect(screen.queryByTestId(searchInput)).toBeNull();
    });
  });
});
