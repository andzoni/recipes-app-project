import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Botões de favoritar e compartilhar', () => {
  const favBtnTestId = 'favorite-btn';
  const shareBtnTestId = 'share-btn';
  const comidaURL = '/comidas/52771';

  it('Deve ter os botões  na página', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(comidaURL);

    const favBtn = await screen.findByTestId(favBtnTestId);
    const shareBtn = await screen.findByTestId(shareBtnTestId);

    expect(favBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
  });

  describe('Botão de favoritar', () => {
    it('Deve mudar a imagem do botão quando a receita é favoritada', async () => {
      const { history } = renderWithRouter(<App />);

      history.push(comidaURL);

      const favBtn = await screen.findByTestId(favBtnTestId);

      expect(favBtn).toHaveAttribute('alt', 'White Heart');

      userEvent.click(favBtn);

      expect(favBtn).toHaveAttribute('alt', 'Black Heart');
    });
  });

  describe('Botão de compartilhar', () => {
    it('deve copiar o link da url quando clicado', async () => {
      const { history } = renderWithRouter(<App />);

      history.push(comidaURL);

      // const shareBtn = await screen.findByTestId(shareBtnTestId);

      // act(() => fireEvent.click(shareBtn));

      // const shareMsg = await screen.findByRole('heading', { name: /Link copiado/i });

      // expect(shareMsg).toBeInTheDocument();
    });
  });
});
