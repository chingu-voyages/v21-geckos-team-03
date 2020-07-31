import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Text, Spinner, Stack } from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import ListItem from '../components/ListItem';
import useWatchLists from '../hooks/useWatchLists';
import EditListDropDown from '../components/EditListDropDown';
import SimpleBox from '../components/SimpleBox';

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

  if (loading) return <Spinner />;
  if (error) return <Text>Error Loading List</Text>;

  return (
    <SimpleBox>
      <Heading as="h2" size="lg">
        {listDetails.title}
      </Heading>
      <EditListDropDown list={listDetails} />
      <Stack>
        {listMovies.map((movie) => (
          <ListItem key={movie.id} movie={movie} />
        ))}
      </Stack>
    </SimpleBox>
  );
}

export default WatchList;
