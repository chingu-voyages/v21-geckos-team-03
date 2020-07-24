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
import FetchLists from '../../hooks/FetchLists';

function MovieCard(props) {
  const { user } = useContext(FirebaseContext);
  console.log(props);
  const { movie } = props;

  const userLists = FetchLists();

  const saveMovie = (list) => {
    // firebase logic needs to go here
    console.log('saving movie to list', movie, list);
  };

  const generateLists = () => {
    if (!userLists) {
      return [];
    }
    const options = userLists.map((list) => {
      console.log('list:', list);
      return (
        <MenuItem key={list.title} onClick={saveMovie('listName')}>
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
