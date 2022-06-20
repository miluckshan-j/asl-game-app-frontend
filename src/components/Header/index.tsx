import React from "react";

import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import {
  AiOutlineHome,
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
        <ButtonGroup gap="2">
          <IconButton aria-label="Home" icon={<AiOutlineHome />} />
          <IconButton
            aria-label="How to play"
            icon={<AiOutlineQuestionCircle />}
          />
        </ButtonGroup>
      </Box>
      <Spacer />
      <Box>
        <Heading as="h2" size="xl">
          Signle
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <ButtonGroup gap="2">
          <IconButton aria-label="Profile" icon={<AiOutlineUser />} />
          <IconButton aria-label="Settings" icon={<AiOutlineSetting />} />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default Header;
