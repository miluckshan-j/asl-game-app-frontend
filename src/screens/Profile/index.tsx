import React from "react";

import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  StackDivider,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";

// Assets
import wordle from "../../assets/icons/wordle.png";

const Profile = () => {
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
            Profile
          </Text>
          <VStack>
            <Divider marginTop={5} />
            <Text as="b" fontSize="2xl" paddingBottom={0} align={"left"}>
              Miluckshan
            </Text>
            <Divider marginY={5} />
            <HStack w="100%" divider={<StackDivider />}>
              <VStack w="100%" spacing={0} paddingY={3} alignItems={"center"}>
                <Text fontSize="xl" paddingBottom={0} align={"left"}>
                  1
                </Text>
                <Text
                  fontSize="sm"
                  color={"gray.500"}
                  paddingBottom={0}
                  align={"left"}
                >
                  Game(s) Played
                </Text>
              </VStack>
              <VStack w="100%" spacing={0} paddingY={3} alignItems={"center"}>
                <Text fontSize="xl" paddingBottom={0} align={"left"}>
                  100
                </Text>
                <Text
                  fontSize="sm"
                  color={"gray.500"}
                  paddingBottom={0}
                  align={"left"}
                >
                  Time(s) Played
                </Text>
              </VStack>
            </HStack>
            <Divider marginY={5} />
            <VStack w="100%" spacing={0} paddingY={3} alignItems={"start"}>
              <Text fontSize="lg" paddingBottom={0} align={"left"}>
                Badges (3)
              </Text>
              <Text
                fontSize="sm"
                paddingBottom={0}
                align={"left"}
                color={"red.500"}
              >
                To Do
              </Text>
            </VStack>
            <Divider marginY={5} />
            <VStack w="100%" spacing={0} paddingY={3} alignItems={"start"}>
              <Text fontSize="lg" paddingBottom={0} align={"left"}>
                Games (1)
              </Text>
              <Image paddingTop={4} src={wordle} w="25%" />
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Profile;
