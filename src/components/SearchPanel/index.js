import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  InputGroup,
  Icon,
  Flex,
  InputLeftElement,
} from '@chakra-ui/core';
import SimpleBox from '../SimpleBox';

const SearchPanel = ({ callback }) => {
  const [state, setState] = useState('');
  const timeOut = useRef(null);

  const handleSearch = (event) => {
    const { value } = event.target;

    clearTimeout(timeOut.current);
    setState(value);
    // when a user types into the input it will wait for 1/2 second before invoking the callback function
    // which will trigger a search.  otherwise the search happens on first keypress which was weird UX
    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };

  return (
    <SimpleBox>
      <Flex align="center" justify="center">
        <InputGroup width="50%" size="lg">
          <InputLeftElement>
            <Icon name="search" color="gray.300" />
          </InputLeftElement>

          <Input
            type="text"
            onChange={handleSearch}
            value={state}
            placeholder="Search for movies"
          />
        </InputGroup>
      </Flex>
    </SimpleBox>
  );
};

SearchPanel.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default SearchPanel;
