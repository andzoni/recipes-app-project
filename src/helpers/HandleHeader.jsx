import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Button } from '../components';
import { profileIcon, searchIcon } from '../images';

const Nav = styled.nav`
  background: #C4C4C4;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100vw;
  height: 58px;
  left: 0px;
  top: 0px;
`;

function HandleHeader({ title, setSearchBarStatus }) {
  const history = useHistory();

  const profileButton = (
    <Button
      className="profileIconBtn"
      name="profile-button"
      buttonType="BackgroundButton"
      onClick={ () => history.push('/perfil') }
      buttonText={
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-icon" />
      }
    />
  );

  if (title !== 'Bebidas' && title !== 'Comidas' && title !== 'Explorar Orígem'
  && title !== 'Explorar Origem') {
    return (
      <Nav>
        { profileButton }
        <h1
          className="headerTitle"
          data-testid="page-title"
        >
          { title }
        </h1>
        <Button
          type="button"
          onClick={ () => history.goBack() }
          buttonType="BackgroundButton"
          buttonText={
            <BsArrowReturnLeft />
          }
        />
      </Nav>
    );
  }

  return (
    <Nav>
      { profileButton }
      <h1
        className="headerTitle"
        data-testid="page-title"
      >
        { title }
      </h1>
      <Button
        type="button"
        name="search-button"
        buttonType="BackgroundButton"
        buttonText={
          <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
        }
        onClick={ () => setSearchBarStatus((prevState) => !prevState) }
      />
    </Nav>
  );
}

const { string, func } = PropTypes;

HandleHeader.propTypes = {
  title: string,
  setSearchBarStatus: func,
}.isRequired;

export default HandleHeader;
