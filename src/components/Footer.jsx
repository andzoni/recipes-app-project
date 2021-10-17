import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button } from '.';
import { drinkIcon, exploreIcon, mealIcon } from '../images';

const StyledFooter = styled.footer`
  background: #C4C4C4;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 58px;
  top: calc(100vh - 58px);
  left: 0;
  img {
    margin: -10px;
  }
`;

function Footer() {
  const history = useHistory();

  return (
    <StyledFooter className="footer" data-testid="footer">
      <Button
        onClick={ () => history.push('/comidas') }
        buttonType="BackgroundButton"
        buttonText={
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="Fork and spoon Icon"
            className="foodsBtnIcon"
          />
        }
      />
      <Button
        onClick={ () => history.push('/explorar') }
        buttonType="BackgroundButton"
        buttonText={
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Compass Icon"
            className="foodsBtnIcon"
          />
        }
      />
      <Button
        onClick={ () => history.push('/bebidas') }
        buttonType="BackgroundButton"
        buttonText={
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Drink Icon"
            className="foodsBtnIcon"
          />
        }
      />
    </StyledFooter>
  );
}

export default Footer;
