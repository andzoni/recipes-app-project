import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWithBackground = styled.button`
  background: ${(props) => (props.icon ? `url(${props.icon})` : 'none')};
  background-size: cover;
  width: 30px;
  margin: 0 10px;
  height: 30px;
  border: none;
  svg{
    position: relative;
    width: 30px;
    height: 30px;
  }
`;

const ButtonWithFilter = styled.button`
  background: #E5E5E5;
  margin: 0 10px;
  border: none;
`;

const Button = (
  { name, id, icon, type, className, disabled = false, onClick, buttonText, buttonType },
) => {
  const BackgroundButton = (
    <ButtonWithBackground
      name={ name }
      id={ id }
      icon={ icon }
      className={ className }
      data-testid={ id }
      type={ type === 'submit' ? 'submit' : 'button' }
      disabled={ disabled }
      onClick={ onClick }
    >
      { buttonText }
    </ButtonWithBackground>
  );
  const FilterButton = (
    <ButtonWithFilter
      name={ name }
      id={ id }
      className={ className }
      data-testid={ id }
      type={ type === 'submit' ? 'submit' : 'button' }
      disabled={ disabled }
      onClick={ onClick }
    >
      { buttonText }
    </ButtonWithFilter>
  );

  return buttonType === 'BackgroundButton' ? BackgroundButton : FilterButton;
};

Button.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
}.isRequired;

export default Button;
