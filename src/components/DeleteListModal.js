/* eslint-disable react/prop-types */
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  IconButton,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/core';

function DeleteListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteList = () => {
    // delete list
  };

  return (
    <>
      <IconButton icon="delete" variant="ghost" mr={2} onClick={onOpen} />

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
              leftIcon="delete"
              onClick={deleteList}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteListModal;
