import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Spinner, Stack } from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import { MovieCard, EditListDropDown } from '../components';
import useWatchLists from '../hooks/useWatchLists';

/* 
  Route: "/lists/:TBA"
  Page for rendering components in a single user created watch list
*/

function WatchList() {
  const { user, firebase } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();
  const { listId } = useParams();
  const [listMovies, setListMovies] = useState([]);
  const [listDetails, setListDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentListId = watchLists.find((list) => list.id === listId);
    setListDetails(currentListId);
  }, [listId, watchLists]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    function getListMovies() {
      if (user) {
        return firebase.db
          .doc(`users/${user.uid}`)
          .collection('lists')
          .doc(`/${listId}`)
          .collection('movies')
          .onSnapshot((snapshot) => {
            const fetchedMovies = snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setListMovies(fetchedMovies);
            setError(null);
            setLoading(false);
          });
      }
      return () => {};
    }
    const unsubscribe = getListMovies();
    return () => unsubscribe();
  }, [listId, watchLists, user, firebase]);

  if (loading) return <Spinner />;
  if (error) return <Text>Error Loading List</Text>;

  return (
    <Box>
      <Heading as="h2" size="lg">
        {listDetails.title}
      </Heading>
      <EditListDropDown list={listDetails} />
      <Stack>
        {listMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            list={listDetails}
            setListMovies={setListMovies}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default WatchList;
