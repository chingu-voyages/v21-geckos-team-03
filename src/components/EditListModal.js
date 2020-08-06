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
  IconButton,
  Tooltip,
} from '@chakra-ui/core';

function EditListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveChanges = () => {
    // save changes to list
  };

  return (
    <>
      <Tooltip hasArrow label="Edit List Details" placement="right">
        <IconButton
          icon="edit"
          variant="ghost"
          mr={2}
          onClick={onOpen}
          ml={5}
        />
      </Tooltip>

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
