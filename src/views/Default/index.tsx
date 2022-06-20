import React from "react";

import { Box, Flex, Spacer } from "@chakra-ui/react";

const Default = (props: any) => {
  return (
    <Flex
      as="main"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="white.500"
    >
      <Spacer />
      <Box width="500px" maxWidth="500px">
        {props.children}
      </Box>
      <Spacer />
    </Flex>
  );
};

export default Default;
