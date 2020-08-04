/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  //   FormControl,
  FormLabel,
  //   FormErrorMessage,
  //   FormHelperText,
} from '@chakra-ui/core';
import SimpleBox from './SimpleBox';

function EditListModal({ saveList }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listDeets, setListDeets] = useState({});

  return (
    <>
      <SimpleBox onClick={onOpen}>Edit List Details</SimpleBox>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="list-title">Title: </FormLabel>
            <Input
              id="list-title"
              variant="outline"
              placeholder="List Title"
              type="string"
              isRequired
              onChange={(e) => {
                setListDeets({ ...listDeets, title: e.target.value });
              }}
            />
            <FormLabel htmlFor="list-description">Description: </FormLabel>

            <Input
              id="list-description"
              variant="outline"
              placeholder="List Description"
              type="text"
              onChange={(e) => {
                setListDeets({ ...listDeets, description: e.target.value });
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button color="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              color="green"
              type="submit"
              onClick={() => saveList(listDeets)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditListModal;
