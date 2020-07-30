/* eslint-disable react/prop-types */
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/core';
import SimpleBox from '../SimpleBox';

function DeleteListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteList = () => {
    // delete list
  };

  return (
    <>
      <SimpleBox onClick={onOpen}>Delete List</SimpleBox>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete {list.title}?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>form goes here</ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteListModal;
