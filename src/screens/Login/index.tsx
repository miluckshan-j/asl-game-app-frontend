import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

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
  useToast,
} from "@chakra-ui/react";

// Utils
import * as api from "../../utils/api";
import { ResponseCodes } from "../../utils/responseCodes";

const Login = () => {
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toast = useToast();

  const emailHandler = (event: any) => {
    setPayload({ ...payload, email: event.target.value });
  };
  const passwordHandler = (event: any) => {
    setPayload({ ...payload, password: event.target.value });
  };

  const login = async () => {
    setLoading(true);
    const response = await api.login(payload);
    if (response.data.code === ResponseCodes.OK) {
      toast({
        title: "Success!",
        status: "success",
        position: "bottom-right",
        duration: 3000,
      });
      // Add to token local storage
      localStorage.setItem("asl_token", response.data.data.token);
      navigate("/");
    } else {
      toast({
        title: response.data.message,
        status: "error",
        position: "bottom-right",
        duration: 3000,
      });
    }
    setLoading(false);
  };

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
            <Input id="email" type="email" onChange={emailHandler} />
          </FormControl>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" onChange={passwordHandler} />
          </FormControl>
          <ButtonGroup gap="2" paddingTop={3}>
            <Button colorScheme="gray" onClick={() => navigate("/")}>
              Skip
            </Button>
            <Button colorScheme="blue" onClick={login} isLoading={loading}>
              Login
            </Button>
          </ButtonGroup>
          <Divider paddingY={3} />
          <Text fontSize="sm" paddingTop={3}>
            Not a user?{" "}
            <Link as={RouterLink} to="/register" color="blue.500">
              Register
            </Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
