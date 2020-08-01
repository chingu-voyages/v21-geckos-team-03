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
import { ListItem } from '../components';
import useWatchLists from '../hooks/useWatchLists';
// import EditListDropDown from '../components/EditListDropDown';

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
    // Two column flex row
    <Flex justify="space-around">
      {/* Sidebar */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        // w="30%"
        h="80vh"
        p={8}
        mr={10}
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
      >
        <Box>
          <Text>Sidebar with watchlists?</Text>
        </Box>
      </Flex>

      {/* Watchlist Container */}
      <Flex direction="column" mx="auto" my="0">
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
              Air plant raw denim iPhone, kinfolk coloring book vaporware
              keffiyeh thundercats. Chambray locavore retro organic bicycle
              rights shaman synth.
            </Text>
          </Box>
        </Flex>

        {/* List Section */}
        {/* Tab Panels */}
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>All</Tab>
            <Tab>Unwatched</Tab>
            <Tab>Watched</Tab>
          </TabList>
          <TabPanels>
            {/* All list Items */}
            <TabPanel>
              {listMovies.map((movie) => (
                <ListItem key={movie.id} movie={movie} />
              ))}
            </TabPanel>
            {/* Unwatched items */}
            <TabPanel>
              <Text>Unwatched goes here...</Text>
            </TabPanel>
            {/* {Watched Items} */}
            <TabPanel>
              <Text>Watched goes here...</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}

export default WatchList;
