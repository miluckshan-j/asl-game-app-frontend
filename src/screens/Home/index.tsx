import React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  VStack,
  Icon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { MdSortByAlpha } from "react-icons/md";

// Assets
import wordle from "../../assets/icons/wordle.png";

const Home = () => {
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
            Home
          </Text>
          <Text fontSize="lg" paddingBottom={3} align={"left"}>
            Learn
          </Text>
          <Text
            fontSize="sm"
            color={"gray.500"}
            paddingBottom={3}
            align={"left"}
          >
            Learn American Sign Language and get familiar with Signle
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={4}>
            <LinkBox>
              <GridItem
                w="100%"
                h="170px"
                padding={3}
                bg="gray.100"
                rounded="xl"
              >
                <LinkOverlay as={RouterLink} to="/learn">
                  <VStack>
                    <Icon as={MdSortByAlpha} w={10} h={10} paddingTop={3} />
                    <Text
                      as={"b"}
                      fontSize="sm"
                      color={"black.300"}
                      align={"left"}
                    >
                      Alphabets
                    </Text>
                    <Text fontSize="sm" color={"black.300"} align={"left"}>
                      Practice A-Z using ASL
                    </Text>
                  </VStack>
                </LinkOverlay>
              </GridItem>
            </LinkBox>
          </Grid>
          <Text fontSize="lg" paddingBottom={3} align={"left"}>
            Games
          </Text>
          <Text
            fontSize="sm"
            color={"gray.500"}
            paddingBottom={3}
            align={"left"}
          >
            Play and win badges with a wide selection of games while learning
            American Sign Language
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={4}>
            <LinkBox>
              <GridItem
                w="100%"
                h="170px"
                padding={3}
                bg="gray.100"
                rounded="xl"
              >
                <LinkOverlay as={RouterLink} to="/game/1">
                  <VStack>
                    <Image paddingTop={4} src={wordle} w="25%" />
                    <Text
                      as={"b"}
                      fontSize="sm"
                      color={"black.300"}
                      align={"left"}
                    >
                      Wordle
                    </Text>
                    <Text fontSize="sm" color={"black.300"} align={"left"}>
                      Guess word in 6 tries
                    </Text>
                  </VStack>
                </LinkOverlay>
              </GridItem>
            </LinkBox>
            <GridItem w="100%" h="170px" padding={3} bg="gray.100" rounded="xl">
              <VStack>
                <Text
                  fontSize="sm"
                  color={"black.300"}
                  paddingTop={"40%"}
                  align={"left"}
                >
                  More coming soon...
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Flex>
  );
};

export default Home;
