import React from 'react';
// import PropTypes from 'prop-types';
import SearchMovie from '../components/SearchMovie';
import LoadScreen from '../components/LoadScreen';

/* 
  Route: "/"
  will contain search movie, movie results components
*/

const Home = (props) => (
  <div>
    <SearchMovie />
    <LoadScreen />
  </div>
);

Home.propTypes = {};

export default Home;
