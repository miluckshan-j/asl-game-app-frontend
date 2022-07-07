import React, { useEffect, useState } from "react";

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
} from "@chakra-ui/react";

// Components
import Prediction from "../../components/Prediction";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const getHighestPrediction = (array: string[]) => {
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
          title: "Excellent!",
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
        setPresentLetter(presentLetter + 1);
      }
      setPredictions([]);
    }
  }, [isRecording, predictedLetter]);

  useEffect(() => {
    if (presentLetter > 25) {
      console.log("Well Done!");
    }
  }, [presentLetter]);

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
                // TODO: Find way to host images
                src={`https://github.com/miluckshan-j/public-project-assets/blob/4b123cba730477e8de605dfb71c0a18250811b61/asl-game-app/${letters[presentLetter]}.jpg`}
                alt={letters[presentLetter]}
                fallbackSrc="https://via.placeholder.com/150/EDF2F7/EDF2F7?Text="
              />
            </Box>
          </Flex>
        </Box>
      </Container>
    </Flex>
  );
};

export default Learn;
