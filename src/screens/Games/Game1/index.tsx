import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useToast,
  VStack,
  Link,
} from "@chakra-ui/react";

// Redux
import type { RootState } from "../../../redux/store";

// Components
import Prediction from "../../../components/Prediction";
import Cell from "../../../components/Cell";
import Result from "../../../components/Result";

// Model
import { ModelAnswer } from "../../../Model";

// Utils
import { VALID_GUESSES } from "../../../utils/validGuesses";
import * as api from "../../../utils/api";
import { ResponseCodes } from "../../../utils/responseCodes";

const gameDetails = {
  gameId: 1,
  gameName: "Wordle",
};

const Game1 = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState("");
  const [predictions, setPredictions] = useState([""]);
  const [presentCell, setPresentCell] = useState(0);
  const [word, setWord] = useState("PRIMO");
  const [isCheck, setIsCheck] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [tries, setTries] = useState(1);
  const [answer, setAnswer] = useState({});
  const [rowAnswer, setRowAnswer] = useState<any>({});
  const [addGameResponse, setAddGameResponse] = useState<any>({});

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isRecording) {
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
    setRowAnswer((rowAns: any) => ({ ...rowAns, [tries.toString()]: answer }));
  }, [answer]);

  const addGameResult = async () => {
    const response = await api.addGameResult({
      ...gameDetails,
      results: { ...rowAnswer },
    });
    if (
      response.data.code === ResponseCodes.UPDATED ||
      response.data.code === ResponseCodes.OK
    ) {
      setAddGameResponse(response.data);
      onOpen();
    } else {
      toast({
        title: "Something unexpected happened!",
        status: "error",
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (tries === 5) {
      if (isAuthenticated) {
        addGameResult();
      } else {
        onOpen();
      }
    }
  }, [tries]);

  const answerHandler = (event: ModelAnswer) => {
    if (event.value !== "") {
      setAnswer((ans) => ({
        ...ans,
        [event.cellNumber.toString()]: {
          value: event.value,
          guess: event.guess,
        },
      }));
    }
  };

  const checkAnswer = () => {
    // Check if row has 5 letters
    if (presentCell === 5) {
      // TODO: Make a word generator
      const guessedWord =
        rowAnswer[tries.toString()]["0"].value +
        rowAnswer[tries.toString()]["1"].value +
        rowAnswer[tries.toString()]["2"].value +
        rowAnswer[tries.toString()]["3"].value +
        rowAnswer[tries.toString()]["4"].value;
      // Check easy mode
      const mode = localStorage.getItem("asl_mode");
      if (mode === "easy") {
        setTries(tries + 1);
        setPresentCell(0);
      }
      // Hard mode
      else {
        // Check if valid word
        if (VALID_GUESSES.includes(guessedWord)) {
          // Check guess word is the correct word
          if (guessedWord === word) {
            setTries(5);
          } else {
            setTries(tries + 1);
            setPresentCell(0);
          }
        }
        // Word not valid
        else {
          toast({
            title: "Word not in list",
            status: "info",
            position: "top",
            duration: 1000,
          });
          // Clear row
          setIsClear(true);
          setPresentCell(0);
        }
      }
    }
    // Row has less than 5 letters
    else {
      setIsCheck(false);
      toast({
        title: "Not enough letters",
        status: "info",
        position: "top",
        duration: 1000,
      });
    }
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
          <ModalHeader>
            {addGameResponse.code === ResponseCodes.OK
              ? "Congratulations!"
              : "Game Over"}
          </ModalHeader>
          <Divider />
          <ModalBody>
            {addGameResponse.code === ResponseCodes.OK ? (
              <Text
                fontSize="md"
                color={"blackAlpha.900"}
                paddingBottom={3}
                align={"left"}
              >
                You have received a {addGameResponse.message}! View all your
                badges from the{" "}
                <Link as={RouterLink} to="/profile" color="blue.500">
                  Profile
                </Link>{" "}
                page
              </Text>
            ) : null}
            <Box paddingX={"10"}>
              <Text fontSize="md" color={"gray.500"} align={"center"}>
                Correct Word:
              </Text>
              <Text
                fontSize="lg"
                color={"blackAlpha.900"}
                paddingBottom={3}
                align={"center"}
              >
                {word}
              </Text>
              <Result result={rowAnswer} />
            </Box>
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
            <Button colorScheme="blue">Share</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="2xl" centerContent>
        <Box w="85%">
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
          <HStack w={"100%"} paddingX={10} marginBottom={2}>
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={1}
              setTry={setTries}
              presentTry={tries}
              cellNumber={0}
              cellLetter="P"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={1}
              setTry={setTries}
              presentTry={tries}
              cellNumber={1}
              cellLetter="R"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={1}
              setTry={setTries}
              presentTry={tries}
              cellNumber={2}
              cellLetter="I"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={1}
              setTry={setTries}
              presentTry={tries}
              cellNumber={3}
              cellLetter="M"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={1}
              setTry={setTries}
              presentTry={tries}
              cellNumber={4}
              cellLetter="O"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
          </HStack>
          <HStack w={"100%"} paddingX={10} marginBottom={2}>
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={2}
              setTry={setTries}
              presentTry={tries}
              cellNumber={0}
              cellLetter="P"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={2}
              setTry={setTries}
              presentTry={tries}
              cellNumber={1}
              cellLetter="R"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={2}
              setTry={setTries}
              presentTry={tries}
              cellNumber={2}
              cellLetter="I"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={2}
              setTry={setTries}
              presentTry={tries}
              cellNumber={3}
              cellLetter="M"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={2}
              setTry={setTries}
              presentTry={tries}
              cellNumber={4}
              cellLetter="O"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
          </HStack>
          <HStack w={"100%"} paddingX={10} marginBottom={2}>
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={3}
              setTry={setTries}
              presentTry={tries}
              cellNumber={0}
              cellLetter="P"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={3}
              setTry={setTries}
              presentTry={tries}
              cellNumber={1}
              cellLetter="R"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={3}
              setTry={setTries}
              presentTry={tries}
              cellNumber={2}
              cellLetter="I"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={3}
              setTry={setTries}
              presentTry={tries}
              cellNumber={3}
              cellLetter="M"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={3}
              setTry={setTries}
              presentTry={tries}
              cellNumber={4}
              cellLetter="O"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
          </HStack>
          <HStack w={"100%"} paddingX={10} marginBottom={2}>
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={4}
              setTry={setTries}
              presentTry={tries}
              cellNumber={0}
              cellLetter="P"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={4}
              setTry={setTries}
              presentTry={tries}
              cellNumber={1}
              cellLetter="R"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={4}
              setTry={setTries}
              presentTry={tries}
              cellNumber={2}
              cellLetter="I"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={4}
              setTry={setTries}
              presentTry={tries}
              cellNumber={3}
              cellLetter="M"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={4}
              setTry={setTries}
              presentTry={tries}
              cellNumber={4}
              cellLetter="O"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
          </HStack>
          <HStack w={"100%"} paddingX={10} marginBottom={2}>
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={5}
              setTry={setTries}
              presentTry={tries}
              cellNumber={0}
              cellLetter="P"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={5}
              setTry={setTries}
              presentTry={tries}
              cellNumber={1}
              cellLetter="R"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={5}
              setTry={setTries}
              presentTry={tries}
              cellNumber={2}
              cellLetter="I"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={5}
              setTry={setTries}
              presentTry={tries}
              cellNumber={3}
              cellLetter="M"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
            <Cell
              presentCell={presentCell}
              setPresentCell={setPresentCell}
              try={5}
              setTry={setTries}
              presentTry={tries}
              cellNumber={4}
              cellLetter="O"
              predictions={predictions}
              setPredictions={setPredictions}
              word={word}
              predictedResults={rowAnswer}
              isRecording={isRecording}
              isCheck={isCheck}
              isClear={isClear}
              setIsClear={setIsClear}
              answerHandler={answerHandler}
            />
          </HStack>
          {/* TODO: Refactor Code later using <CellRow /> */}
          <Button
            colorScheme="blue"
            onClick={checkAnswer}
            disabled={tries === 5}
          >
            Check
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default Game1;
