/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import MovieCard from '../MovieCard';

/* 
  Takes user input, queries API with input.  
  Returns an array of movies and sets in state.
  maps over state and passes in movies with a valid poster path via props to MovieCard component

  wip: needs error handling and loading set
*/

function SearchMovies() {
  const [query, setQuery] = useState('');
  // create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);
  const searchMovies = async function (e) {
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
    <>
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
      <div className="cardList">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}

export default SearchMovies;
