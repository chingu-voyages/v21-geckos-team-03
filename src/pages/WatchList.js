import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import Movies from '../components/Movies';
import useWatchLists from '../hooks/useWatchLists';

/* 
  Route: "/lists/:TBA"
  Page for rendering components in a single user created watch list
*/

function UserList() {
  const { user, firebase } = useContext(FirebaseContext);
  const { listId } = useParams();
  const [listMovies, setListMovies] = useState([]);
  const [listDetails, setListDetails] = useState({});
  const { watchLists } = useWatchLists();

  useEffect(() => {
    function getWatchListDetails(id) {
      return watchLists.filter((list) => list.id === id);
    }

    if (user) {
      firebase.getMoviesInWatchList(user.uid, listId).then((snapshot) => {
        const fetchedMovies = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setListDetails(getWatchListDetails(listId));
        setListMovies(fetchedMovies);
      });
    }
  }, [listId, watchLists, user, firebase]);

  return (
    <Box>
      <Heading as="h2" size="lg">
        {listDetails.title}
      </Heading>
      <Movies movies={listMovies} />
    </Box>
  );
}

export default UserList;
