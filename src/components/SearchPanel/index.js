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
  const [isfocus, setFocus] = useState(false);
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

  const onFocus = (e) => {
    setFocus(true);
  };

  const unFocus = (e) => {
    setFocus(false);
  };

  return (
    <Flex align="center" justify="center">
      <InputGroup
        width="45%"
        size="lg"
        className={isfocus ? `focus` : `notFocus`}
      >
        <InputLeftElement>
          <Icon name="search" color="gray.300" />
        </InputLeftElement>

        <Input
          onMouseOver={onFocus}
          onMouseOut={unFocus}
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
