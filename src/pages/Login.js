import React from 'react';
import { Flex } from '@chakra-ui/core';
import { AuthForm } from '../components';

/* 
  Routes: "/login"
  Renders login component for login and register functionality 
*/

const Login = () => (
  <Flex justify="center" align="center" mt="10%" p={3}>
    <AuthForm />
  </Flex>
);

export default Login;
