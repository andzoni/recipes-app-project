import React from 'react';
import PropTypes from 'prop-types';
import HandleHeader from '../helpers/HandleHeader';

function Header({ title, setSearchBarStatus }) {
  return (
    <header>
      <HandleHeader title={ title } setSearchBarStatus={ setSearchBarStatus } />
    </header>
  );
}

const { string } = PropTypes;

Header.propTypes = {
  title: string,
}.isRequired;

export default Header;
