import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import Movies from '../components/Movies';
import useWatchLists from '../hooks/useWatchLists';

/* 
  Route: "/lists/:TBA"
  Page for rendering components in a single user created watch list
*/

function WatchList() {
  const { listId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, firebase } = useContext(FirebaseContext);
  const [listMovies, setListMovies] = useState([]);
  const [listDetails, setListDetails] = useState({});
  const { watchLists } = useWatchLists();

  useEffect(() => {
    const currentListId = watchLists.find((list) => list.id === listId);
    setListDetails(currentListId);
  }, [listId, watchLists]);

  useEffect(() => {
    setLoading(true);
    if (user) {
      try {
        firebase.getMoviesInWatchList(user.uid, listId).then((snapshot) => {
          const fetchedMovies = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setListMovies(fetchedMovies);
          setError(null);
          setLoading(false);
        });
      } catch (err) {
        setError(err);
      }
    }
  }, [listId, watchLists, user, firebase]);

  if (loading) return <Text>Loading List</Text>;
  if (error) return <Text>Error Loading List</Text>;

  return (
    <Box>
      <Heading as="h2" size="lg">
        {listDetails.title}
      </Heading>
      <Movies movies={listMovies} />
    </Box>
  );
}

export default WatchList;
