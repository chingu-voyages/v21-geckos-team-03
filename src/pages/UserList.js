import React from 'react';
import Movies from '../components/Movies';
// import PropTypes from 'prop-types';

/* 
  Route: "/lists/:TBA"
  Page for rendering components in a single user created watch list
*/

function UserList() {
  const movies = [];
  return <Movies movies={movies} />;
}

UserList.propTypes = {};

export default UserList;
