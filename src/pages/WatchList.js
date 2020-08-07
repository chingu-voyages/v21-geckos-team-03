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
  Collapse,
  IconButton,
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
  const [show, setShow] = React.useState(false);
  const { listId } = useParams();
  const { listMovies, listDetails, error, loading } = useSingleWatchList(
    listId
  );

  const handleToggle = () => setShow(!show);

  if (loading) return <Spinner />;
  if (error) return <Text>Error Loading List</Text>;
  console.log('list details: ', listDetails);
  return (
    // Two column flex row
    <Flex justify="space-around">
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
      <Flex direction="column" mx="auto" my="0">
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
          {!listDetails.description ? null : (
            <Box py={5}>
              <Text fontSize="xs" mb={4}>
                Description:
              </Text>

              {listDetails.description.length < 240 ? (
                <Text fontSize="sm" mb={4}>
                  {listDetails.description}
                </Text>
              ) : (
                <Flex>
                  <Collapse startingHeight={40} isOpen={show}>
                    <Text fontSize="sm" mb={4}>
                      {listDetails.description}
                    </Text>
                  </Collapse>
                  <IconButton
                    icon="chevron-down"
                    variant="ghost"
                    onClick={handleToggle}
                    justify="right"
                  />
                </Flex>
              )}
            </Box>
          )}
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
                <ListItem
                  key={movie.id}
                  data={movie}
                  listDetails={listDetails}
                />
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
