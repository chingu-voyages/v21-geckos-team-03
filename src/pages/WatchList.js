import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heading,
  Text,
  Box,
  Spinner,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import ListItem from '../components/ListItem';
import useWatchLists from '../hooks/useWatchLists';
// import EditListDropDown from '../components/EditListDropDown';

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
    <Flex pt={8} direction="column" mx="auto" my="0" maxWidth="800px">
      <Flex
        direction="column"
        borderBottom="1px"
        borderBottomStyle="dashed"
        mb={8}
      >
        <Flex justify="space-between">
          <Heading as="h1" size="xl" mb={4}>
            {listDetails.title}
          </Heading>
          {/* <EditListDropDown list={listDetails} /> */}
          <Menu>
            <MenuButton as={Button} rightIcon="chevron-down">
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem as="a" href="#">
                Attend a Workshop
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Flex align="center" mb={6}>
          <Icon name="time" mr={2} />
          <Text fontSize="xs" mr={8}>
            Created:
          </Text>
          <Text fontSize="xs">July 31st,2020</Text>
        </Flex>
        <Box py={6}>
          <Text fontSize="xs" mb={4}>
            Description:
          </Text>
          <Text fontSize="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            repudiandae consequuntur magni odit modi nobis corporis sunt
            repellat nostrum beatae.
          </Text>
        </Box>
      </Flex>

      {listMovies.map((movie) => (
        <ListItem key={movie.id} movie={movie} />
      ))}
    </Flex>
  );
}

export default WatchList;
