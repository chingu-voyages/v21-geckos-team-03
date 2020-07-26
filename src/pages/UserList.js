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
  // const [list, setList] = useState({});

  useEffect(() => {
    try {
      // firebase.db
      //   .doc(`users/${user.uid}`)
      //   .collection('lists')
      //   .doc(`${listid}`)
      //   .get()
      //   .then((querySnapshot) => {
      //     const fetchedList = querySnapshot.docs.map((doc) => ({
      //       id: doc.id,
      //       ...doc.data(),
      //     }));
      //     setList(fetchedList);
      //     console.log('list: ', list);
      //   });
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

  console.log('listid:', listid);
  console.log('movies', movies);
  return (
    <Box>
      <Heading as="h2" size="lg">
        List Title Here
      </Heading>
      <Movies movies={movies} />
    </Box>
  );
}

UserList.propTypes = {};

export default UserList;
