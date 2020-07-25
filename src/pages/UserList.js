import React from 'react';
import { useParams } from 'react-router-dom';
import Movies from '../components/Movies';
// import PropTypes from 'prop-types';

/* 
  Route: "/lists/:TBA"
  Page for rendering components in a single user created watch list
*/

function UserList() {
  const { listid } = useParams();
  const movies = [];
  console.log('listid:', listid);
  return <Movies movies={movies} />;
}

UserList.propTypes = {};

export default UserList;
