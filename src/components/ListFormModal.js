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

function ListFormModal({ list, type }) {
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
      <IconButton icon="edit" variant="ghost" mr={2} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List Details</ModalHeader>
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
                  defaultValue={type === 'edit' ? list.title : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage maxWidth="200px">
                  {errors.title}
                </FormErrorMessage>
              </FormControl>

              <FormLabel htmlFor="list-description">Description: </FormLabel>

              <Input
                id="list-description"
                variant="outline"
                placeholder="List Description"
                defaultValue={type === 'edit' ? list.description : null}
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
                Save Changes
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

export default ListFormModal;
