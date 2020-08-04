/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
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
  Input,
  //   FormControl,
  FormLabel,
  //   FormErrorMessage,
  //   FormHelperText,
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';

function NewListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listDeets, setListDeets] = useState({});
  const { firebase, user } = useContext(FirebaseContext);

  const saveList = () => {
    const newList = {
      createdAt: new Date(),
      title: listDeets.title,
      description: listDeets.description,
    };
    firebase.createNewWatchList(newList, user.uid);
  };

  return (
    <>
      <Button onClick={onOpen} color="green">
        New List
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="list-title">Title: </FormLabel>
            <Input
              id="list-title"
              variant="outline"
              placeholder="List Title"
              type="string"
              isRequired
              onChange={(e) => {
                setListDeets({ ...listDeets, title: e.target.value });
              }}
            />
            <FormLabel htmlFor="list-description">Description: </FormLabel>

            <Input
              id="list-description"
              variant="outline"
              placeholder="List Description"
              type="text"
              onChange={(e) => {
                setListDeets({ ...listDeets, description: e.target.value });
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button color="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              color="green"
              type="submit"
              onClick={() => saveList(listDeets)}
            >
              Create List
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewListModal;
