import React from "react";

import { Box, Container, Flex, Text } from "@chakra-ui/react";

// Components
import CellRow from "../../../components/CellRow";

const Game1 = () => {
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
            Letter Match
          </Text>
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
        </Box>
      </Container>
    </Flex>
  );
};

export default Game1;
