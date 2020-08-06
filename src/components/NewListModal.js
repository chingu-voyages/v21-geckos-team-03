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
  FormLabel,
  IconButton,
  Tooltip,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import useFormValidation from '../hooks/useFormValidation';
import { validateListForm } from '../utils';

const INITIAL_STATE = {
  title: '',
  description: '',
};

function NewListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebase, user } = useContext(FirebaseContext);
  const [firebaseError, setFirebaseError] = useState(null);
  // Hooks must be at the top of the function, a rule of hooks
  // surprised this got past the linter
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
  } = useFormValidation(INITIAL_STATE, validateListForm, saveList);

  // changed to regular function declaration so it can be declared after its use
  async function saveList() {
    const newList = {
      // nothing to spread in since its a new list, right? think we can remove
      // ...list,
      title: values.title,
      description: values.description,
      // changed this from modifiedAt to createdAt, changed the date format
      // so it's consistent with the  date formatting function
      createdAt: Date.now(),
    };
    try {
      // changed this from editWatchList to create
      await firebase.createNewWatchList(newList, user.uid);
      // dont need to await this
      onClose();
    } catch (error) {
      setFirebaseError(error.message);
    }
  }

  return (
    <>
      <Tooltip hasArrow label="New List" placement="bottom">
        <IconButton icon="add" variant="ghost" onClick={onOpen} />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New List</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Title: </FormLabel>
                <Input
                  name="title"
                  variant="outline"
                  placeholder="List Title"
                  type="string"
                  isRequired
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage maxWidth="200px">
                  {errors.title}
                </FormErrorMessage>
              </FormControl>

              <FormLabel htmlFor="description">Description: </FormLabel>

              <Input
                id="description"
                name="description"
                variant="outline"
                placeholder="List Description"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </ModalBody>

            <ModalFooter>
              <Button color="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="green"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Create List
              </Button>
              <FormControl isInvalid={firebaseError}>
                <FormErrorMessage maxWidth="220px">
                  {firebaseError}
                </FormErrorMessage>
              </FormControl>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewListModal;
