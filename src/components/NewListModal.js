/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
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

function NewListModal({ noLists }) {
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
  } = useFormValidation(INITIAL_STATE, validateListForm, saveList);

  async function saveList() {
    const newList = {
      title: values.title,
      description: values.description,
      createdAt: Date.now(),
    };
    try {
      await firebase.createNewWatchList(newList, user.uid);
      onClose();
    } catch (error) {
      setFirebaseError(error.message);
    }
  }

  const prompt = () => {
    if (noLists) {
      return (
        <Button size="sm" bg="transparent" border="1px" mt={5} onClick={onOpen}>
          Create a List
        </Button>
      );
    }
    return (
      <Tooltip hasArrow label="New List" placement="bottom">
        <IconButton icon="add" variant="ghost" onClick={onOpen} />
      </Tooltip>
    );
  };

  return (
    <>
      {prompt()}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">New List</ModalHeader>
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
