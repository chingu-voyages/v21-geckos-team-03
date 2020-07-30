/* eslint-disable react/prop-types */
import React from 'react';
import {
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/core';

function DeleteListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteList = () => {
    // delete list
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Delete List</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            `Are you sure you want to delete ${list.title}?`
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            form goes here
            <Button
              variantColor="red"
              mr={3}
              onClick={onClose}
              leftIcon="delete"
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={deleteList}>
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteListModal;
