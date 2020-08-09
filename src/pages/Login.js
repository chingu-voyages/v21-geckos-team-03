import React from 'react';
import { Flex } from '@chakra-ui/core';
import { AuthForm } from '../components';

const Login = () => (
  <Flex justify="center" align="center" mt="10%" p={3}>
    <AuthForm />
  </Flex>
);

export default Login;
