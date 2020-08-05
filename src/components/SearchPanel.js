import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.css';

import {
  Input,
  InputGroup,
  Icon,
  Flex,
  InputLeftElement,
  // PseudoBox
} from '@chakra-ui/core';

const SearchPanel = ({ callback }) => {
  const [state, setState] = useState('');
  const [isHover, setIsHover] = useState(false);
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
    <Flex align="center" justify="center">
      <InputGroup
        width={isHover ? '50%' : '45%'}
        transition={isHover ? '0.5s' : '0.5s'}
        size="lg"
      >
        <InputLeftElement>
          <Icon name="search" color="gray.300" />
        </InputLeftElement>

        <Input
          fontSize={['10px', '12px', '1.25rem', '1.25rem']}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          type="text"
          onChange={handleSearch}
          value={state}
          placeholder="Search for movies"
        />
      </InputGroup>
    </Flex>
  );
};

SearchPanel.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default SearchPanel;
