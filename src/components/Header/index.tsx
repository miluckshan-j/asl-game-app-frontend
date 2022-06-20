import React from "react";

import { Box, Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import {
  AiOutlineQuestionCircle,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={2}
      bg="white.500"
      color="blackAlpha.900"
      borderBottom="1px solid #CBD5E0"
    >
      <Box>
        <IconButton
          aria-label="How to play"
          icon={<AiOutlineQuestionCircle />}
        />
      </Box>
      <Spacer />
      <Box>
        <Heading as="h2" size="xl">
          Signle
        </Heading>
      </Box>

      <Spacer />
      <Box>
        <IconButton aria-label="Profile" icon={<AiOutlineUser />} />
        <IconButton aria-label="Settings" icon={<AiOutlineSetting />} />
      </Box>
    </Flex>
  );
};

export default Header;
