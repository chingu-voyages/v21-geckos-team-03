/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  Icon,
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
  const { colorMode, toggleColorMode } = useColorMode();

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
      <Flex align="center" justify="center">
        <Box
          p={5}
          bg={colorMode === 'light' ? '#C8C8C8' : '#313641'}
          rounded="20px"
        >
          <Flex align="center" justify="center" direction="column">
            <Text fontSize="20px">Auth Form</Text>
            <Tabs mt="15px">
              <TabList>
                <Tab w="50%">Login</Tab>
                <Tab w="50%">Register</Tab>
              </TabList>
              <TabPanels mt={4}>
                <TabPanel>
                  <Flex align="center" justify="center" direction="column">
                    <Input type="text" placeholder="Email" size="lg" />
                    <Input
                      type="password"
                      placeholder="Password"
                      size="lg"
                      mt={5}
                    />
                    <Button mt={5} width="100%">
                      Login
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex align="center" justify="center" direction="column">
                    <Input type="text" placeholder="Username" size="lg" />
                    <Input type="text" placeholder="Email" size="lg" mt={5} />
                    <Input
                      type="password"
                      placeholder="Password"
                      size="lg"
                      mt={5}
                    />
                    <Button mt={5} width="100%">
                      Register
                    </Button>
                  </Flex>
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
