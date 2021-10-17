import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id,
  labelText,
  type,
  name, className, value, placeHolder, onChange, required, searchQuery }) {
  return (
    <label htmlFor={ id } className={ `${className}-label` }>
      { labelText }
      <input
        type={ type }
        id={ id }
        name={ name }
        value={ value }
        placeholder={ placeHolder }
        data-testid={ id }
        onChange={ onChange }
        required={ required }
        checked={ searchQuery === name }
      />
    </label>
  );
}

const { string, func, bool } = PropTypes;

Input.propTypes = {
  id: string,
  labelText: string,
  type: string,
  name: string,
  className: string,
  value: string,
  placeHolder: string,
  onChange: func,
  required: bool,
  searchQuery: string,
}.isRequired;

export default Input;
