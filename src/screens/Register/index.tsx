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
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";

// Utils
import * as api from "../../utils/api";
import { ResponseCodes } from "../../utils/responseCodes";

const Register = () => {
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toast = useToast();

  const usernameHandler = (event: any) => {
    setPayload({ ...payload, username: event.target.value });
  };
  const emailHandler = (event: any) => {
    setPayload({ ...payload, email: event.target.value });
  };
  const passwordHandler = (event: any) => {
    setPayload({ ...payload, password: event.target.value });
  };

  const register = async () => {
    setLoading(true);
    const response = await api.register(payload);
    if (response.data.code === ResponseCodes.CREATED) {
      toast({
        title: "Registered",
        status: "success",
        position: "bottom-right",
        duration: 3000,
      });
      navigate("/login");
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
            Register
          </Text>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" type="username" onChange={usernameHandler} />
          </FormControl>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" onChange={emailHandler} />
          </FormControl>
          <FormControl isRequired paddingBottom={3}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" onChange={passwordHandler} />
            <FormHelperText>
              Please don't use your bank password. I didn't spend much time on
              security
            </FormHelperText>
          </FormControl>
          <ButtonGroup gap="2">
            <Button colorScheme="gray" onClick={() => navigate("/")}>
              Skip
            </Button>
            <Button colorScheme="blue" onClick={register} isLoading={loading}>
              Register
            </Button>
          </ButtonGroup>
          <Divider paddingY={3} />
          <Text fontSize="sm" paddingTop={3}>
            Already a user?{" "}
            <Link as={RouterLink} to="/login">
              Login
            </Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
