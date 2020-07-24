import React from 'react';
// import PropTypes from 'prop-types';
import SearchMovie from '../components/SearchMovie';

/* 
  Route: "/"
  will contain search movie, movie results components
*/

const Home = (props) => (
  <div>
    <SearchMovie />
  </div>
);

Home.propTypes = {};

export default Home;
