import React, { useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Text,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Input,
  Button,
  FormErrorMessage,
  FormControl,
  Link,
} from '@chakra-ui/core';
import SimpleBox from './SimpleBox';
import useFormValidation from '../hooks/useFormValidation';
import validateLogin from '../utils';
import firebase from '../firebase';

/* 
JSX rendered on the login page.
Takes in user text input for both login and register Firebase functions.
A single button toggles login state as true or false.  
When true, onSubmit calls login to firebase auth
When false register is called
*/

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

  /* 
    Passed into form validation hook above
    Called with in the hook with handleSubmit if no errors in hook state
    On submission, an auth state change is "heard"  in firebase's auth service.
    New state is reported, set, and made available in the useAuth hook
  */
  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      history.push('/');
    } catch (error) {
      setFirebaseError(error.message);
    }
  }

  return (
    <Flex align="center" justify="center" height="auto" mx={0}>
      <SimpleBox>
        <Flex align="center" p={4} justify="center" direction="column">
          <Heading fontSize="lg" color="white" mb={4}>
            {login ? 'Login' : 'Create account'}
          </Heading>
          <Tabs mt={4} isFitted>
            <TabList mb={6}>
              <Tab onClick={() => setLogin(true)}>Login</Tab>
              <Tab onClick={() => setLogin(false)}>Register</Tab>
            </TabList>
            <TabPanels>
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
                      mt={6}
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
          <Link as={RouterLink} to="/forgot">
            <Text mt={4} fontSize="xs">
              Forgot your password?
            </Text>
          </Link>
        </Flex>
      </SimpleBox>
    </Flex>
  );
};

export default AuthForm;
