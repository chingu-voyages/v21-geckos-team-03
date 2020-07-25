/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ListDropDown from '../ListDropDown';

/* 
  Renders a single movie passed in as a prop
*/

function MovieCard(props) {
  const { movie, userLists } = props;
  console.log('movie', movie);
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
      <ListDropDown movie={movie} userLists={userLists} />
    </div>
  );
}

MovieCard.propTypes = {
  userLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
