import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  Box,
  Tabs,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Text,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Heading,
  Flex,
  Spinner,
  Icon,
  Tooltip,
  Link,
  Image,
  Skeleton,
} from '@chakra-ui/core';
import MovieThumb from './MovieThumb';
import SaveMovieDropDown from './SaveMovieDropDown';
import ActorCard from './ActorCard';
import useMovieFetch from '../hooks/useMovieFetch';
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../utils/config';
import IMDB from '../images/imdb.png';

const MovieModal = ({
  movieId,
  watchLists,
  isListItem,
  isTitle,
  isListItemTitle,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movie, loading, error] = useMovieFetch(movieId);

  if (loading && !isListItemTitle && !isTitle) return <Spinner />;
  if (loading && (isListItemTitle || isTitle))
    return <Skeleton height="20px" my="10px" />;
  if (error) return <Text>Error: {error}</Text>;

  const prompt = () => {
    if (isTitle) {
      return (
        <Heading onClick={onOpen} as="h2" fontSize={['xl', '2xl', '3xl']}>
          {movie.title}
        </Heading>
      );
    }
    if (isListItemTitle) {
      return (
        <Text onClick={onOpen} fontSize={['md', 'md', 'lg']} mr={4} mb={1}>
          {movie.title}
        </Text>
      );
    }
    return (
      <MovieThumb
        posterPath={movie.poster_path}
        movieId={movie.id}
        clickable
        onClick={onOpen}
        small={isListItem}
      />
    );
  };

  return (
    <>
      {prompt()}
      <Modal size="80%" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader>
            <Flex align="center">
              <Heading mr={2} fontSize="2xl">
                {movie.title}
              </Heading>
              <Text>{` - ${movie.release_date.slice(0, 4)}`}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={4}>
            <Box
              background={
                movie.backdrop_path
                  ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
                  : '#000'
              }
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              width="100%"
              height="100%"
              px={10}
              py={10}
              mb={10}
              borderRadius="md"
            >
              <Flex mx={0} my="auto" bg="rgb(0, 0, 0, 0.7)" borderRadius="20px">
                <Box p={8}>
                  <Flex justify="space-between" align="center">
                    <Heading color="white">{movie.original_title}</Heading>
                    {!isListItem && (
                      <SaveMovieDropDown
                        movie={movie}
                        watchLists={watchLists}
                        color="white"
                      />
                    )}
                  </Flex>
                  <Flex direction={['column', 'column', 'row']}>
                    <Heading color="white" fontSize="lg" mr={2}>
                      Directed by:
                    </Heading>
                    {movie.directors &&
                      movie.directors.map((dir) => (
                        <Text color="white" key={dir.credit_id}>
                          {dir.name}
                        </Text>
                      ))}
                  </Flex>
                  <Text color="white" mb={4}>
                    <Icon name="star" size="8px" mb={1} mr={2} />
                    {movie.vote_average}
                  </Text>
                  <Text color="white" mb={4}>
                    {movie.overview}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Flex
              justifyContent="space-between"
              flexDir="row"
              align="center"
              ml={5}
              mr={5}
            >
              <Flex>
                <Heading fontSize="2xl" mb={4}>
                  Cast
                </Heading>
              </Flex>
              {movie.imdb_id ? (
                <Flex maxH="5">
                  <Tooltip hasArrow label="View Movie on IMDb" placement="left">
                    <Link href={`https://www.imdb.com/title/${movie.imdb_id}/`}>
                      <Image src={IMDB} h="30px" />
                    </Link>
                  </Tooltip>
                </Flex>
              ) : null}
            </Flex>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Top Actors</Tab>
                <Tab>All Actors</Tab>
              </TabList>
              <TabPanels my={4}>
                <TabPanel>
                  <Flex flexWrap="wrap" justifyContent="space-around">
                    {movie.actors &&
                      movie.actors
                        .slice(0, 4)
                        .map((actor) => (
                          <ActorCard key={actor.credit_id} actor={actor} />
                        ))}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex flexWrap="wrap" justifyContent="space-around">
                    {movie.actors &&
                      movie.actors.map((actor) => (
                        <ActorCard key={actor.credit_id} actor={actor} />
                      ))}
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

MovieModal.propTypes = {
  movieId: PropTypes.number.isRequired,
  watchLists: PropTypes.arrayOf(PropTypes.object),
  isListItem: PropTypes.bool,
  isTitle: PropTypes.bool,
  isListItemTitle: PropTypes.bool,
};

MovieModal.defaultProps = {
  watchLists: [],
  isListItem: false,
  isTitle: false,
  isListItemTitle: false,
};

export default MovieModal;
