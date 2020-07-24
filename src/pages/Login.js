import React from 'react';
import { Flex } from '@chakra-ui/core';
import AuthForm from '../components/Auth/AuthForm';

const Login = () => (
  <Flex justify="center" align="center" mt="20%" p={3}>
    <AuthForm />
  </Flex>
);

export default Login;
