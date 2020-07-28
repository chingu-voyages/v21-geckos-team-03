import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/index';

function LoadScreen() {
  const [movieArray, setMovies] = useState([]);

  //  const getMovies = async function () {
  //      var response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=6ee25636d25df9899ed46e80a13383ff")
  //      let data = await response.json()

  //      setMovies(  data.results )
  //   }

  useEffect(async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=6ee25636d25df9899ed46e80a13383ff'
    );
    const data = await response.json();

    setMovies(data.results);
  }, []);

  return (
    <div>
      <select>
        <option>Popular</option>
        <option>Now Playing</option>
      </select>
      <h1>Popular Movies</h1>
      {movieArray.map(function (movie) {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
}

export default LoadScreen;
