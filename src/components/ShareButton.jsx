import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { shareIcon } from '../images';

const copy = require('clipboard-copy');

function ShareButton({ id, type, testID, index }) {
  const [visibility, setVIsibility] = useState(false);

  const hostName = window.location.origin;

  const timeOut = 2000;

  const handleShareLink = () => {
    // pode ser usando o href ou location.pathname
    if (type === 'comida' || type === 'bebida') {
      copy(`${hostName}/${type}s/${id}`);
    } else {
      copy(`${hostName}/${type}/${id}`);
    }
    setVIsibility(true);
    setTimeout(() => {
      setVIsibility(false);
    }, timeOut);
  };

  return (
    <>
      <input
        type="image"
        className="share-btn"
        src={ shareIcon }
        alt="share button"
        data-testid={
          testID === 'regular'
            ? 'share-btn'
            : `${index}-horizontal-share-btn`
        }
        onClick={ handleShareLink }
      />
      { visibility && <div className="alert">Link copiado!</div> }
    </>
  );
}

const { string } = PropTypes;

ShareButton.propTypes = {
  id: string,
  type: string,
}.isRequired;

export default ShareButton;
