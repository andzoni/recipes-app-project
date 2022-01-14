import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../components';
import { setDefaultLocalStorage } from '../services/localStorageFunctions';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #C4C4C4;
  display: flex-box;
  position: fixed;
  padding: 15px;
  align-items: center;
  text-align: center;
  align-content: center;
  width: 100%;
`;

const Form = styled.form`;
  padding: 5px;
  align-items: center;
  text-align: center;
  align-content: center;
`;

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [disableButton, setDisableButton] = useState(true);

  const checkLoginData = (email, password) => {
    const MIN_LENGTH_PASSWORD = 6;
    const regex = /\S+@\S+\.\S+/;

    return regex.test(email) && password.length > MIN_LENGTH_PASSWORD;
  };

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    setDisableButton(checkLoginData(login.email, login.password));
  }, [login.email, login.password]);

  const history = useHistory(); // https://reactrouter.com/web/api/Hooks/usehistory
  const handleSubmit = (event) => {
    event.preventDefault();

    setDefaultLocalStorage(login.email);

    history.push('/comidas');
  };

  return (
    <main>
      <Nav>
        <h1>Recipes App Project</h1>
        <Form onSubmit={ handleSubmit }>
          <Input
            type="email"
            id="email-input"
            name="email"
            className="emailInput"
            placeHolder="E-mail"
            onChange={ handleChange }
          />
          <Input
            type="password"
            id="password-input"
            name="password"
            className="passwordInput"
            placeHolder="Senha"
            onChange={ handleChange }
          />
          <Button
            className="buttonLogin"
            id="login-submit-btn"
            type="submit"
            buttonText="Login"
            disabled={ !disableButton }
          />
        </Form>
      </Nav>
    </main>
  );
};

export default Login;
