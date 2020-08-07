import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Heading,
  Text,
  Box,
  Spinner,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
} from '@chakra-ui/core';
import {
  ListItem,
  EditListModal,
  DeleteListModal,
  NewListModal,
} from '../components';
import { formatDate } from '../utils';
import useSingleWatchList from '../hooks/useSingleWatchList';

function WatchList() {
  const { listId } = useParams();
  const { listMovies, listDetails, error, loading } = useSingleWatchList(
    listId
  );

  if (loading) return <Spinner />;
  if (error) return <Text>Error Loading List</Text>;

  return (
    // Two column flex row
    <Flex>
      {/* Sidebar */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
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
      <Flex direction="column" mx="auto" width="100%" my="0">
        {/*  List Details  */}
        <Flex
          direction="column"
          borderBottom="1px"
          borderBottomStyle="dashed"
          mb={12}
        >
          <Flex justify="space-between">
            <Flex>
              <Heading as="h1" size="xl" mb={4}>
                {listDetails.title}
              </Heading>
              <EditListModal list={listDetails} />
            </Flex>
            <Flex>
              <NewListModal />
              <DeleteListModal list={listDetails} />
            </Flex>
          </Flex>
          <Flex align="center" mb={6}>
            <Icon name="time" mr={2} />
            <Text fontSize="xs" mr={6}>
              Created:
            </Text>
            <Text fontSize="xs">{formatDate(listDetails.createdAt)}</Text>
          </Flex>
          <Box py={5}>
            <Text fontSize="xs" mb={4}>
              Description:
            </Text>
            <Text fontSize="sm" mb={4}>
              {listDetails.description}
            </Text>
          </Box>
        </Flex>

        {/* Tab Panels */}
        <Tabs defaultIndex={0} isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Unwatched</Tab>
            <Tab>Watched</Tab>
            <Tab>All</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Unwatched items */}
              {listMovies
                .filter((movie) => !movie.watched)
                .map((unwatchedMovie) => (
                  <ListItem
                    key={unwatchedMovie.id}
                    data={unwatchedMovie}
                    listDetails={listDetails}
                  />
                ))}
            </TabPanel>
            {/* {Watched Items} */}
            <TabPanel>
              {listMovies
                .filter((movie) => movie.watched)
                .map((watchedMovie) => (
                  <ListItem
                    key={watchedMovie.id}
                    data={watchedMovie}
                    listDetails={listDetails}
                  />
                ))}
            </TabPanel>
            {/* All list Items */}
            <TabPanel>
              {listMovies.map((movie) => (
                <ListItem
                  key={movie.id}
                  data={movie}
                  listDetails={listDetails}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}

export default WatchList;
