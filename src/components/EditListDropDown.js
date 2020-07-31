/* eslint-disable react/prop-types */
import React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
  Box,
  AccordionIcon,
  AccordionItem,
} from '@chakra-ui/core';

import { Link, NavLink } from 'react-router-dom';
import EditListModal from './EditListModal';
import DeleteListModal from './DeleteListModal';
import SimpleBox from './SimpleBox';

function EditListDropDown({ list }) {
  return (
    <div>
      <Accordion allowToggle defaultIndex={[]} siz="sm">
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="center">
              Edit List
            </Box>
            <AccordionIcon />
          </AccordionHeader>

          <AccordionPanel pb={4}>
            <EditListModal list={list} />
            <DeleteListModal list={list} />
            <Link as={NavLink} to="#">
              {' '}
              {/* no route for this just yet */}
              <SimpleBox> + New List</SimpleBox>
            </Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default EditListDropDown;
