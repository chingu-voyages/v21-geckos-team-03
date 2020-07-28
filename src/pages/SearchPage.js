import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import SearchPanel from '../components/SearchPanel';
import Movies from '../components/Movies';
import LoadScreen from '../components/LoadScreen/index';

/* 
  Route: "/"
  will contain search movie, movie results components
*/

function SearchPage(props) {
  const [movies, setMovies] = useState([]);
  return (
    <div>
      <SearchPanel setMovies={setMovies} />
      <Movies movies={movies} />
      <LoadScreen />
    </div>
  );
}

SearchPage.propTypes = {};

export default SearchPage;
