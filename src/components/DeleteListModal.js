/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  IconButton,
  Button,
  useDisclosure,
  ModalFooter,
  Tooltip,
  useToast,
} from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../firebase';

function DeleteListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebase, user } = useContext(FirebaseContext);
  const toast = useToast();
  const history = useHistory();

  const deleteWatchList = (listId, userId) => {
    try {
      const listRef = firebase.db
        .doc(`users/${user.uid}`)
        .collection('lists')
        .doc(list.id);

      history.push('/lists');
      listRef.delete().then(() => {
        console.log(`List with ID ${list.id} deleted`);
        toast({
          title: 'List deleted',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      });
    } catch (error) {
      console.log('Error deleting list', error);
      toast({
        title: 'Something went wrong',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Tooltip hasArrow label="Delete List" placement="bottom">
        <IconButton icon="delete" variant="ghost" mr={2} onClick={onOpen} />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete {list.title}?
          </ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody>form goes here</ModalBody> */}
          <ModalFooter>
            <Button
              variantColor="red"
              mr={3}
              leftIcon="delete"
              onClick={deleteWatchList}
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
