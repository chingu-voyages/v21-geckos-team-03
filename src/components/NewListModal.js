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
          <ModalHeader>Edit List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>form goes here</ModalBody>

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
