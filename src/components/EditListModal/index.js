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
import SimpleBox from '../SimpleBox';

function EditListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveChanges = () => {
    // save changes to list
  };

  return (
    <>
      <SimpleBox onClick={onOpen}>Edit List</SimpleBox>

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
            <Button color="green" onClick={saveChanges}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditListModal;
