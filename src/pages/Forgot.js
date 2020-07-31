import React, { useState, useContext } from 'react';
import {
  FormControl,
  Input,
  Text,
  FormErrorMessage,
  Flex,
  Button,
  Icon,
} from '@chakra-ui/core';
import { SimpleBox } from '../components';
import { FirebaseContext } from '../firebase';

const Forgot = () => {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (error) {
      setPasswordResetError(error.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <Flex
      direction="column"
      width="400px"
      justify="center"
      align="center"
      mx="auto"
      my={0}
    >
      <SimpleBox>
        <Flex direction="column" justify="center" align="center" mx="auto">
          <Text fontSize="sm" mx={12} my={0} pt={4} textAlign="center">
            Provide your account email to receive a reset link
          </Text>

          <Flex
            direction="column"
            justify="center"
            align="center"
            p={8}
            width="100%"
          >
            <Input
              onChange={(event) => setResetPasswordEmail(event.target.value)}
              size="lg"
              type="email"
              mb={2}
              width="100%"
              placeholder="Email Address"
            />

            <Button
              type="submit"
              mt={4}
              bg="primary"
              onClick={handleResetPassword}
            >
              Reset your password
            </Button>

            {isPasswordReset && (
              <Flex mt={4} align="center" justify="center">
                <Icon name="check" color="green.300" mr={2} />
                <Text fontSize="xs" color="green.300">
                  Check email to reset
                </Text>
              </Flex>
            )}

            <Flex mt={4} align="center" justify="center">
              <FormControl isInvalid={passwordResetError}>
                <FormErrorMessage maxWidth="220px">
                  {passwordResetError}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>
        </Flex>
      </SimpleBox>
    </Flex>
  );
};

export default Forgot;
