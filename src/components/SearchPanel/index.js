/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// the portion of the page containing the search box and button, etc.

function SearchPanel({ setMovies }) {
  const [query, setQuery] = useState('');

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log('submit');

    const url = `https://api.themoviedb.org/3/search/movie?api_key=6ee25636d25df9899ed46e80a13383ff&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch {
      console.log('err');
    }
  };

  return (
    <form className="form" onSubmit={searchMovies}>
      <label className="label" htmlFor="query">
        Movie Name
      </label>
      <input
        className="input"
        type="text"
        placeholder="search movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="query"
      />
      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}

SearchPanel.propTypes = {
  setMovies: PropTypes.func.isRequired,
};

export default SearchPanel;
