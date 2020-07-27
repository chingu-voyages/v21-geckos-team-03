import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import Movies from '../components/Movies';
// import PropTypes from 'prop-types';

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
      <Movies movies={movies} />
    </Box>
  );
}

UserList.propTypes = {};

export default UserList;
