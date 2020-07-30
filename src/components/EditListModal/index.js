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
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/core';

function EditListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveChanges = () => {
    // save changes to list
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Edit List</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>form goes here</ModalBody>

          <ModalFooter>
            <Button variantColor="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="green" onClick={saveChanges}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditListModal;
