import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
  Button,
  Divider,
} from '@chakra-ui/core';
import { ListItem, EditListModal, DeleteListModal } from '../components';
import { formatDate } from '../utils';
import useSingleWatchList from '../hooks/useSingleWatchList';

function WatchList() {
  const [show, setShow] = useState(false);
  const { listId } = useParams();
  const { listMovies, listDetails, error, loading } = useSingleWatchList(
    listId
  );
  const history = useHistory();

  const handleToggle = () => setShow(!show);

  const findPrompt = () => {
    return (
      <Flex
        w="100%"
        h="100%"
        p={10}
        mb={2}
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
        textAlign="center"
        flexDir="column"
      >
        <Text>This list doesn&apos;t have any movies yet!</Text>
        <Flex justify="center">
          <Button
            size="sm"
            bg="transparent"
            border="1px"
            mt={5}
            onClick={() => {
              history.push('/');
            }}
          >
            Find Movies
          </Button>
        </Flex>
      </Flex>
    );
  };

  if (loading) return <Spinner />;
  if (error) return <Text>Error Loading List</Text>;

  return (
    <Box maxWidth="800px" mx="auto" my={0}>
      <Flex direction="column">
        {/*  List Details  */}
        <Flex direction="column" mb={12}>
          <Flex justify="space-between">
            <Flex>
              <Heading as="h1" size="xl" mb={4}>
                {listDetails.title}
              </Heading>
              <EditListModal list={listDetails} />
            </Flex>
            <Flex>
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
              <Heading fontSize="sm" mb={4}>
                Description:
              </Heading>
              {listDetails.description.length < 240 ? (
                <Text fontSize="md" mb={4}>
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
          <Divider />
        </Flex>

        {!listMovies || listMovies.length === 0 ? (
          findPrompt()
        ) : (
          <>
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
          </>
        )}
      </Flex>
    </Box>
  );
}

export default WatchList;
