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
  Tooltip,
} from '@chakra-ui/core';

function DeleteListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteList = () => {
    // delete list
  };

  return (
    <>
      <Tooltip hasArrow label="Delete List">
        <IconButton icon="delete" variant="ghost" mr={2} onClick={onOpen} />
      </Tooltip>

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
