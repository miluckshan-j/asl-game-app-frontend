import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";

// Assets
import ASLAlphabets from "../../assets/alphabets/ASL-Alphabets.jpg";

const Header = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"lg"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Reference</ModalHeader>
          <Divider />
          <ModalBody>
            <Text
              fontSize="sm"
              color={"blackAlpha.900"}
              paddingBottom={3}
              align={"left"}
            >
              Use the following reference whenever you are stuck. It is
              recommended that you access the{" "}
              <Link
                as={RouterLink}
                to="/learn"
                color="blue.500"
                onClick={onClose}
              >
                Learn
              </Link>{" "}
              page to train and get familiar with the app for the best result
            </Text>
            <Flex w="100%" paddingX={"10"}>
              <Image src={ASLAlphabets} alt={"ASL Alphabets"} />
            </Flex>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            aria-label="Reference"
            icon={<AiOutlineQuestionCircle />}
            onClick={onOpen}
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
