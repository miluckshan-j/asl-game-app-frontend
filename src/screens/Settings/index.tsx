import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";

const Settings = () => {
  const [modeIsChecked, setModeIsChecked] = useState(
    localStorage.getItem("bsl_mode") === "easy" ? true : false
  );

  const navigate = useNavigate();

  const modeHandler = (event: any) => {
    if (event.target.checked) {
      setModeIsChecked(true);
      localStorage.setItem("bsl_mode", "easy");
    } else {
      setModeIsChecked(false);
      localStorage.setItem("bsl_mode", "hard");
    }
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
            Settings
          </Text>
          <VStack>
            <HStack w="100%">
              <VStack w="80%" spacing={0} alignItems={"start"}>
                <Text fontSize="lg" paddingBottom={0} align={"left"}>
                  Easy Mode
                </Text>
                <Text
                  fontSize="sm"
                  color={"gray.500"}
                  paddingBottom={3}
                  align={"left"}
                >
                  Word validity check will be disabled
                </Text>
              </VStack>
              <Switch
                size="md"
                isChecked={modeIsChecked}
                onChange={modeHandler}
              />
            </HStack>
            <Divider marginY={5} />
            <HStack w="100%">
              <VStack w="80%" spacing={0} alignItems={"start"}>
                <Text fontSize="lg" paddingBottom={0} align={"left"}>
                  Dark Mode
                </Text>
                <Text
                  fontSize="sm"
                  color={"gray.500"}
                  paddingBottom={3}
                  align={"left"}
                >
                  Coming soon...
                </Text>
              </VStack>
              <Switch size="md" />
            </HStack>
            <Divider marginY={5} />
            <HStack w="100%">
              <VStack w="80%" spacing={0} alignItems={"start"}>
                <Text fontSize="lg" paddingY={3} align={"left"}>
                  Edit Profile
                </Text>
              </VStack>
              <IconButton
                aria-label="Edit profile"
                icon={<AiOutlineRight />}
                backgroundColor="white"
                onClick={() => {
                  navigate("profile");
                }}
              />
            </HStack>
            <Divider marginY={5} />
            <HStack w="100%">
              <VStack w="70%" spacing={0} alignItems={"start"}>
                <Text fontSize="lg" paddingBottom={0} align={"left"}>
                  Feedback
                </Text>
                <Text
                  fontSize="sm"
                  color={"gray.500"}
                  paddingBottom={3}
                  align={"left"}
                >
                  Please consider evaluating project
                </Text>
              </VStack>
              <Text fontSize="sm" paddingBottom={3} align={"left"}>
                Google Forms
              </Text>
            </HStack>
            <Divider marginY={5} />
            <HStack w="100%">
              <VStack w="80%" spacing={0} alignItems={"start"}>
                <Text fontSize="lg" paddingY={3} align={"left"}>
                  Questions?
                </Text>
              </VStack>
              <Text fontSize="sm" paddingBottom={3} align={"left"}>
                Email
              </Text>
            </HStack>
            <Divider marginY={5} />
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Settings;
