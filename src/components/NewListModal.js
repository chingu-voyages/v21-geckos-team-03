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

  const saveList = async () => {
    const newList = {
      ...list,
      title: values.title,
      description: values.description,
      modifiedAt: new Date(),
    };
    try {
      await firebase.editWatchList(newList, user.uid);
      await onClose();
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
  } = useFormValidation(INITIAL_STATE, validateListForm, saveList);

  return (
    <>
      <IconButton icon="add" variant="ghost" onClick={onOpen} />

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
