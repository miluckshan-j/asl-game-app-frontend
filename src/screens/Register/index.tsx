import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

const Register = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="white.500"
      p={3}
    >
      <Container maxW="2xl" centerContent>
        <Box maxW="sm">
          <Text fontSize="xl" paddingY={5}>
            Register
          </Text>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" />
            <FormHelperText>
              Please don't use your bank password. I didn't spend much time on
              security
            </FormHelperText>
          </FormControl>
          <ButtonGroup gap="2">
            <Button colorScheme="gray">Skip</Button>
            <Button colorScheme="blue">Register</Button>
          </ButtonGroup>
          <Divider paddingY={3} />
          <Text fontSize="sm" paddingTop={3}>
            Already a user?{" "}
            {/* TODO: Use React Router Link. Refer: https://chakra-ui.com/docs/components/navigation/link */}
            <Link>Login</Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
