/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Link,
} from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

/* 
  Renders fetched single movie.  Props are passed in from API call in Search Movie Component
*/

function MovieCard(props) {
  const { user, firebase } = useContext(FirebaseContext);
  console.log('movieCard props: ', props);
  const { movie, userLists } = props;

  const saveMovie = (list) => {
    firebase.db
      .doc(`users/${user.uid}`)
      .collection('lists')
      .doc(list.id)
      .collection('movies')
      .add(movie);
    console.log('saving movie to list', movie, list);
  };

  const generateLists = () => {
    // generates list names for the dropdown
    if (!userLists) {
      return [];
    }
    let i = 0;
    const options = userLists.map((list) => {
      i += 1;
      return (
        <MenuItem key={`${i}-${list.title}`} onClick={() => saveMovie(list)}>
          {list.title}
        </MenuItem>
      );
    });
    return options;
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
        <Menu>
          <MenuButton as={Button}>Save to List</MenuButton>
          <MenuList>
            {user ? (
              <MenuGroup>
                {generateLists()}
                <MenuDivider />
                <MenuItem> + New List</MenuItem>
              </MenuGroup>
            ) : (
              <>
                <MenuGroup>
                  <Link as={NavLink} to="/login">
                    <MenuItem>Log In/Sign Up</MenuItem>
                  </Link>
                </MenuGroup>
              </>
            )}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default MovieCard;
