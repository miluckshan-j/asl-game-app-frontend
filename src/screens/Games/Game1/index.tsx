import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";

// Components
import Prediction from "../../../components/Prediction";
// import CellRow from "../../../components/CellRow";
import Cell from "../../../components/Cell";

// Model
import { ModelAnswer } from "../../../Model";

// Utils
import { VALID_GUESSES } from "../../../utils/validGuesses";

const Game1 = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState("");
  const [predictions, setPredictions] = useState([""]);
  const [presentCell, setPresentCell] = useState(0);
  const [word, setWord] = useState("PRIMO");
  const [isCheck, setIsCheck] = useState(false);
  const [tries, setTries] = useState(1);
  const [answer, setAnswer] = useState({});
  const [rowAnswer, setRowAnswer] = useState<any>({});

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

  useEffect(() => {
    if (tries === 3) {
      console.log("Game Over!");
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
    if (presentCell === 5) {
      // TODO: Make a word generator
      const guessedWord =
        rowAnswer[tries.toString()]["0"].value +
        rowAnswer[tries.toString()]["1"].value +
        rowAnswer[tries.toString()]["2"].value +
        rowAnswer[tries.toString()]["3"].value +
        rowAnswer[tries.toString()]["4"].value;
      // Check if valid word
      if (VALID_GUESSES.includes(guessedWord)) {
        // Check guess word is the correct word
        if (guessedWord === word) {
          setTries(3);
        } else {
          setTries(tries + 1);
          setPresentCell(0);
        }
      }
      // Word not valid
      else {
        // alert("Enter a valid word!");
        // Clear row
        // Present cell = 0

        // Note: Assuming word is valid. Remove later and use above logic
        console.log("WORD NOT VALID");
        if (guessedWord === word) {
          setTries(3);
        } else {
          setTries(tries + 1);
          setPresentCell(0);
        }
        // Note
      }
    } else {
      setIsCheck(false);
      alert("Input all 5 letters!");
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
              answerHandler={answerHandler}
            />
          </HStack>
          {/* TODO: Refactor Code later
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow />
          <CellRow /> */}
          <Button colorScheme="blue" onClick={checkAnswer}>
            Check
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default Game1;
