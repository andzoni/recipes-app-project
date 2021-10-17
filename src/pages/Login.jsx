import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../components';
import { setDefaultLocalStorage } from '../services/localStorageFunctions';

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
      <form onSubmit={ handleSubmit }>
        <Input
          type="email"
          id="email-input"
          name="email"
          className="emailInput"
          placeholder="E-mail"
          onChange={ handleChange }
        />
        <Input
          type="password"
          id="password-input"
          name="password"
          className="passwordInput"
          placeholder="Senha"
          onChange={ handleChange }
        />
        <Button
          className="buttonLogin"
          id="login-submit-btn"
          type="submit"
          buttonText="Login"
          disabled={ !disableButton }
        />
      </form>
    </main>
  );
};

export default Login;
