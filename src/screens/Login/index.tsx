import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="white.500"
      p={3}
    >
      <Container maxW="2xl" centerContent>
        <Box w="85%">
          <Text fontSize="xl" paddingY={5}>
            Login
          </Text>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" />
          </FormControl>
          <ButtonGroup gap="2" paddingTop={3}>
            <Button colorScheme="gray">Skip</Button>
            <Button colorScheme="blue">Login</Button>
          </ButtonGroup>
          <Divider paddingY={3} />
          <Text fontSize="sm" paddingTop={3}>
            Not a user?{" "}
            {/* TODO: Use React Router Link. Refer: https://chakra-ui.com/docs/components/navigation/link */}
            <Link>Register</Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
