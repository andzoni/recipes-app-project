import React from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from '../components';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Main = styled.main`
  margin-top: 68px;
`;

const Explorer = () => (
  <Main>

    <Header title="Explorar" />

    <Link to="/explorar/comidas">
      <Button
        id="explore-food"
        buttonText="Explorar Comidas"
      />
    </Link>

    <Link to="/explorar/bebidas">
      <Button
        id="explore-drinks"
        buttonText="Explorar Bebidas"
      />
    </Link>

    <Footer />

  </Main>
);

export default Explorer;
