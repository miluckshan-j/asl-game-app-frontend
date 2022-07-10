import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          <IconButton
            aria-label="Home"
            icon={<AiOutlineHome />}
            onClick={() => {
              navigate("/");
            }}
          />
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
          <IconButton
            aria-label="Profile"
            icon={<AiOutlineUser />}
            onClick={() => {
              navigate("profile");
            }}
          />
          <IconButton
            aria-label="Settings"
            icon={<AiOutlineSetting />}
            onClick={() => {
              navigate("settings");
            }}
          />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default Header;
