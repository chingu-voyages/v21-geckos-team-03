import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Stack } from '@chakra-ui/core';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';
import { FirebaseContext } from '../firebase';
import MovieCard from '../components/MovieCard';
import NoImage from '../images/no_image.png';

/* 
  Route: "/lists/:TBA"
  Page for rendering components in a single user created watch list
*/

function UserList() {
  const { user, firebase } = useContext(FirebaseContext);
  const { listid } = useParams();
  const [movies, setMovies] = useState([]);
  const [list, setList] = useState({});

  useEffect(() => {
    try {
      firebase.db
        .doc(`users/${user.uid}`)
        .collection('lists')
        .get()
        .then((querySnapshot) => {
          const fetchedLists = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const currentList = fetchedLists.find((l) => l.id === listid);
          setList(currentList);
          console.log('list: ', currentList);
        });
    } catch (err) {
      console.log('error: ', err.message);
    }
  }, [user]);

  useEffect(() => {
    try {
      firebase.db
        .doc(`users/${user.uid}`)
        .collection('lists')
        .doc(`/${listid}`)
        .collection('movies')
        .get()
        .then((querySnapshot) => {
          const fetchedMovies = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMovies(fetchedMovies);
        });
    } catch (err) {
      console.log('error: ', err.message);
    }
  }, [user]);

  return (
    <Box>
      <Heading as="h2" size="lg">
        {list.title}
      </Heading>
      <Stack align="center">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            movie={movie}
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
          />
        ))}
      </Stack>
    </Box>
  );
}

export default UserList;
