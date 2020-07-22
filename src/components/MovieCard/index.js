/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function MovieCard(props) {
  const [activeList, setActiveList] = useState([]);
  console.log(props);
  const { movie } = props;

  const userLists = [{ name: 'action movies' }, { name: 'movie night' }];

  const generateLists = () => {
    if (!userLists) {
      return [];
    }
    console.log('generating lists for dropdown', userLists);
    const options = userLists.map((list) => {
      console.log(list);
      return (
        <option key={list.name} value={list.name}>
          {list.name}
        </option>
      );
    });
    return options;
  };

  const saveMovie = () => {
    // firebase logic needs to go here
    console.log('saving movie to list', movie, activeList);
  };

  const handleChange = (e) => {
    setActiveList(e.target.value);
  };

  return (
    <div className="card">
      <img
        className="card--image"
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="card--content">
        <h3 className="card--title">{movie.title}</h3>
        <p>
          <small>
            RELEASE DATE:
            {movie.release_date}
          </small>
        </p>
        <p>
          <small>
            RATING:
            {movie.vote_average}
          </small>
        </p>
        <p className="card--desc">{movie.overview}</p>
      </div>
      <div>
        <select name="list" id="list" onChange={handleChange}>
          {generateLists()}
        </select>
        <button type="submit" onClick={saveMovie}>
          Save
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
