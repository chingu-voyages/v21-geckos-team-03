import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
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
  useToast,
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import useFormValidation from '../hooks/useFormValidation';
import { validateListForm } from '../utils';

function EditListModal({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebase, user } = useContext(FirebaseContext);
  const [firebaseError, setFirebaseError] = useState(null);
  const toast = useToast();
  const INITIAL_STATE = {
    title: list.title,
    description: list.description,
  };

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
      ...list,
      title: values.title,
      description: values.description,
      modifiedAt: Date.now(),
    };

    try {
      await firebase.editWatchList(editedList, user.uid);
      onClose();
      toast({
        title: 'List Edited',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      setFirebaseError(error.message);
      toast({
        title: 'Something went wrong',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
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
        <ModalContent borderRadius="md">
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
EditListModal.propTypes = {
  list: PropTypes.object.isRequired,
};

EditListModal.propTypes = {
  list: PropTypes.object.isRequired,
};

export default EditListModal;
