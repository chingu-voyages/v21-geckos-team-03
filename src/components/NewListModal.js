/* eslint-disable react/prop-types */
import React from 'react';
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

function NewListModal({ list, saveList }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} color="green">
        New List
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="list-title">Title: </FormLabel>
            <Input
              id="list-title"
              variant="outline"
              placeholder="List Title"
              isRequired
            />
            <FormLabel htmlFor="list-description">Description: </FormLabel>

            <Input
              id="list-description"
              variant="outline"
              placeholder="List Description"
            />
          </ModalBody>

          <ModalFooter>
            <Button color="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="green" type="submit" onClick={saveList}>
              Create List
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewListModal;
