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
  Textarea,
  Flex,
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import useFormValidation from '../hooks/useFormValidation';
import { validateListForm } from '../utils';

const INITIAL_STATE = {
  title: '',
  description: '',
};

function EditListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebase, user } = useContext(FirebaseContext);
  const [firebaseError, setFirebaseError] = useState(null);

  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
  } = useFormValidation(INITIAL_STATE, validateListForm, editList);

  async function editList() {
    const editedList = {
      // weird that the list ID is being spread in in firebase
      // can't figure out how to make it stop
      ...list,
      title: values.title,
      description: values.description,
      modifiedAt: Date.now(),
    };
    try {
      await firebase.editWatchList(editedList, user.uid);
      onClose();
    } catch (error) {
      setFirebaseError(error.message);
    }
  }

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
          <ModalHeader>Edit List Details</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <Flex>
                <FormControl isInvalid={errors.title}>
                  <FormLabel htmlFor="title">Title: </FormLabel>
                  <Input
                    name="title"
                    variant="outline"
                    placeholder="List Title"
                    type="string"
                    isRequired
                    defaultValue={list.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage maxWidth="200px">
                    {errors.title}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <Flex mt={2} flexDir="column">
                <FormLabel htmlFor="description">Description: </FormLabel>

                <Textarea
                  id="description"
                  name="description"
                  variant="outline"
                  placeholder="List Description"
                  defaultValue={list.description}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Flex>
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

export default EditListModal;
