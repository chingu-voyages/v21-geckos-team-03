/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';

function NewListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebase, user } = useContext(FirebaseContext);
  const history = useHistory();

  const newList = {
    createdAt: Date.now(),
    title: 'new list from modal',
    description: 'this is a new test list created from front end',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      history.push('/login');
    } else {
      firebase.createNewWatchList(newList, user.uid);
    }
  };

  return (
    <>
      <IconButton icon="add" variant="ghost" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New WatchList</ModalHeader>
          <ModalCloseButton />
          <ModalBody>form goes here</ModalBody>

          <ModalFooter>
            <Button color="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSubmit}>
              Create new list
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewListModal;
