import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Input,
  Button,
  useColorMode,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/core';
import useFormValidation from '../../../hooks/useFormValidation';
import validateLogin from '../../../utils';
import firebase from '../../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

const AuthForm = () => {
  const history = useHistory();
  const [firebaseError, setFirebaseError] = useState(null);
  const [login, setLogin] = useState(true);
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const { colorMode } = useColorMode();

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      history.push('/');
    } catch (error) {
      console.error('Authentication Error', error);
      setFirebaseError(error.message);
    }
  }

  return (
    <>
      <Flex
        align="center"
        justify="center"
        height="auto"
        mx={0}
        maxWidth="600px"
      >
        <Box
          py={10}
          px={6}
          bg={colorMode === 'light' ? '#C8C8C8' : '#313641'}
          rounded="20px"
        >
          <Flex align="center" justify="center" direction="column">
            <Text fontSize="md">{login ? 'Login' : 'Create account'}</Text>
            <Tabs mt={4} isFitted>
              <TabList>
                <Tab onClick={() => setLogin(true)}>Login</Tab>
                <Tab onClick={() => setLogin(false)}>Register</Tab>
              </TabList>
              <TabPanels mt={4}>
                <TabPanel>
                  {/* Login */}
                  <form onSubmit={handleSubmit}>
                    <Flex align="center" justify="center" direction="column">
                      <FormControl isInvalid={errors.email}>
                        <Input
                          value={values.email}
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          size="lg"
                          mt={5}
                          width="100%"
                        />
                        <FormErrorMessage maxWidth="200px">
                          {errors.email}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.password}>
                        <Input
                          value={values.password}
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          size="lg"
                          mt={5}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Button
                        type="submit"
                        mt={5}
                        width="100%"
                        bg="primary"
                        disabled={isSubmitting}
                      >
                        Login
                      </Button>
                      <FormControl isInvalid={firebaseError}>
                        <FormErrorMessage maxWidth="220px">
                          {firebaseError}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>
                  </form>
                </TabPanel>
                <TabPanel>
                  {/* Register */}
                  <form onSubmit={handleSubmit}>
                    <Flex align="center" justify="center" direction="column">
                      <Input
                        value={values.name}
                        type="text"
                        name="name"
                        placeholder="Your name"
                        onChange={handleChange}
                        size="lg"
                      />
                      <FormControl isInvalid={errors.email}>
                        <Input
                          value={values.email}
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          size="lg"
                          mt={5}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.password}>
                        <Input
                          value={values.password}
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          size="lg"
                          mt={5}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Button
                        type="submit"
                        mt={5}
                        width="100%"
                        variant="outline"
                        borderColor="primary"
                        disabled={isSubmitting}
                      >
                        Register
                      </Button>
                    </Flex>
                  </form>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default AuthForm;
