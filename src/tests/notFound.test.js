import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Página \'Not Found\'', () => {
  it('Testa se a página existe', () => {
    renderWithRouter(<App />, { initialEntries: ['/notfoundpage'] });
    const notFountTitle = screen.getByText(/not found/i);
    expect(notFountTitle).toBeInTheDocument();
  });
});
