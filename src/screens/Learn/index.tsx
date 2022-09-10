import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  useToast,
  VStack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
} from "@chakra-ui/react";

// Components
import Prediction from "../../components/Prediction";

const letters = ["A", "B", "C", "D"];

const getHighestPrediction = (array: string[]) => {
  console.log("ARRAY", array);

  const maxValue = array.reduce((previous, current, i, arr) =>
    arr.filter((item) => item === previous).length >
    arr.filter((item) => item === current).length
      ? previous
      : current
  );
  return maxValue;
};

const Learn = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState("");
  const [predictions, setPredictions] = useState([""]);
  const [presentLetter, setPresentLetter] = useState(0);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isRecording) {
      setPredictions([]);
      let startTime = new Date().getTime();
      const interval = setInterval(() => {
        if (new Date().getTime() - startTime > 5000) {
          setIsRecording(false);
          clearInterval(interval);
          return;
        }
      }, 1000);
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      setPredictions((oldArray) => [...oldArray, predictedLetter]);
    }
  }, [isRecording, predictedLetter]);

  useEffect(() => {
    if (!isRecording && predictions.length > 1) {
      const predicted = getHighestPrediction(predictions);
      if (letters[presentLetter] === predicted) {
        toast({
          title: "Well Done!",
          status: "success",
          position: "top",
          duration: 2000,
        });
        setPresentLetter(presentLetter + 1);
      } else {
        toast({
          title: "Try again",
          status: "info",
          position: "top",
          duration: 2000,
        });
        // Test
        // setPresentLetter(presentLetter + 1);
      }
      setPredictions([]);
    }
  }, [isRecording, predictedLetter]);

  useEffect(() => {
    if (presentLetter > 3) {
      onOpen();
      console.log("Completed");
    }
  }, [presentLetter]);

  const retry = () => {
    setPresentLetter(0);
    onClose();
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="white.500"
      p={3}
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
          <ModalHeader>Excellent!</ModalHeader>
          <Divider />
          <ModalBody>
            <Text
              fontSize="md"
              color={"blackAlpha.900"}
              paddingBottom={3}
              align={"left"}
            >
              You are all set. Try out some spelling games by visiting the{" "}
              <Link as={RouterLink} to="/" color="blue.500">
                Home
              </Link>{" "}
              page
            </Text>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Text fontSize="sm" color={"gray.500"} align={"left"}>
              This is a project done to evaluate the benefits of gamifying
              learning ASL. Please{" "}
              <Link href="#" color="blue.500" isExternal>
                Provide Feedback
              </Link>
            </Text>
            <Button colorScheme="gray" onClick={onClose} mr={3}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={retry}>
              Retry
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="2xl" centerContent>
        <Box w="85%">
          <Text fontSize="xl" paddingY={5}>
            Learn
          </Text>
          <VStack>
            <Prediction
              isRecording={isRecording}
              predictedLetter={predictedLetter}
              setPredictedLetter={setPredictedLetter}
            />
            <Button
              colorScheme="red"
              variant={"outline"}
              isLoading={isRecording}
              loadingText="Recording"
              onClick={() => setIsRecording(true)}
            >
              Record
            </Button>
          </VStack>
          <Divider marginY={5} />
          <Flex>
            <Box w="100%">
              <Text fontSize="6xl" paddingY={5}>
                {letters[presentLetter] || ""}
              </Text>
            </Box>
            <Box w="100%">
              <Image
                src={`https://res.cloudinary.com/dufl0llvg/image/upload/${letters[presentLetter]}.jpg`}
                alt={letters[presentLetter]}
                fallbackSrc={`https://via.placeholder.com/150/EDF2F7/EDF2F7?Text=${letters[presentLetter]}`}
              />
            </Box>
          </Flex>
        </Box>
      </Container>
    </Flex>
  );
};

export default Learn;
