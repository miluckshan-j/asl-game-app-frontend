import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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
  useToast,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

// Utils
import * as api from "../../utils/api";
import { ResponseCodes } from "../../utils/responseCodes";

// Assets
import wordle from "../../assets/icons/wordle.png";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>({});

  const toast = useToast();

  const retrieveProfile = async () => {
    const response = await api.retrieveProfile();
    if (response.data.code === ResponseCodes.OK) {
      setUserDetails(response.data.data);
    } else {
      toast({
        title: response.data.message,
        status: "error",
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    retrieveProfile();
  }, []);

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
              {userDetails?.username || "N/A"}
            </Text>
            <Divider marginY={5} />
            <HStack w="100%" divider={<StackDivider />}>
              <VStack w="100%" spacing={0} paddingY={3} alignItems={"center"}>
                <Text fontSize="xl" paddingBottom={0} align={"left"}>
                  {userDetails?.gamesPlayed?.length || "N/A"}
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
                  {userDetails?.results?.length || "N/A"}
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
                Badges{" "}
                {userDetails?.badges?.length > 0
                  ? `(${userDetails?.badges?.length})`
                  : ""}
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
                Games{" "}
                {userDetails?.gamesPlayed?.length > 0
                  ? `(${userDetails?.gamesPlayed?.length})`
                  : ""}
              </Text>
              <LinkBox>
                <LinkOverlay as={RouterLink} to="/game/1">
                  <Image paddingTop={4} src={wordle} w="25%" />
                </LinkOverlay>
              </LinkBox>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Profile;
