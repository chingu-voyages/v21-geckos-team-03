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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  MenuDivider,
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
      {/*  List Details  */}
      <Flex
        direction="column"
        borderBottom="1px"
        borderBottomStyle="dashed"
        mb={12}
      >
        <Flex justify="space-between">
          <Heading as="h1" size="xl" mb={4}>
            {listDetails.title}
          </Heading>
          <Menu>
            <MenuButton as={Button} size="sm" rightIcon="chevron-down">
              Actions
            </MenuButton>
            <MenuList placement="auto-end">
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuDivider />
              <MenuItem>Create New</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Flex align="center" mb={6}>
          <Icon name="time" mr={2} />
          <Text fontSize="xs" mr={6}>
            Created:
          </Text>
          <Text fontSize="xs">July 31st,2020</Text>
        </Flex>

        <Box py={5}>
          <Text fontSize="xs" mb={4}>
            Description:
          </Text>
          <Text fontSize="sm" mb={4}>
            Air plant raw denim iPhone, kinfolk coloring book vaporware keffiyeh
            thundercats. Chambray locavore retro organic bicycle rights shaman
            synth.
          </Text>
        </Box>
      </Flex>
      {/* List Items */}

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>All</Tab>
          <Tab>Unwatched</Tab>
          <Tab>Watched</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {listMovies.map((movie) => (
              <ListItem key={movie.id} movie={movie} />
            ))}
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default WatchList;
