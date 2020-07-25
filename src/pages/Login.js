import React from 'react';
import { Flex } from '@chakra-ui/core';
import AuthForm from '../components/Auth/AuthForm';

/* 
  Routes: "/login"
  Renders login component for login and register functionality 
*/

const Login = () => (
  <Flex justify="center" align="center" mt="20%" p={3}>
    <AuthForm />
  </Flex>
);

export default Login;
