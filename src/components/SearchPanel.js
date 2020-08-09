import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  InputGroup,
  Icon,
  Flex,
  InputLeftElement,
} from '@chakra-ui/core';

const SearchPanel = ({ callback }) => {
  const [state, setState] = useState('');
  const [isHover, setIsHover] = useState(false);
  const timeOut = useRef(null);

  const handleSearch = (event) => {
    const { value } = event.target;
    clearTimeout(timeOut.current);
    setState(value);
    timeOut.current = setTimeout(() => {
      callback(value);
    }, 300);
  };

  return (
    <Flex align="center" justify="center">
      <InputGroup
        width={
          isHover ? ['95%', '95%', '95%', '65%'] : ['90%', '90%', '90%', '60%']
        }
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
