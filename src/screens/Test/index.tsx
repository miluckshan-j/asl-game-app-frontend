import React, { useEffect, useState } from "react";

// Components
import Prediction from "../../components/Prediction";
import Cell from "../../components/Cell";
import Result from "../../components/Result";

// Model
import { ModelAnswer } from "../../Model";

// Utils
import { VALID_GUESSES } from "../../utils/validGuesses";
import sampleAnswer from "../../utils/sampleAnswer.json";

// TODO: Remove screen after testing
const Test = () => {
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
    <>
      <Result result={sampleAnswer} />
    </>
    //   <>
    //     <Prediction
    //       isRecording={isRecording}
    //       predictedLetter={predictedLetter}
    //       setPredictedLetter={setPredictedLetter}
    //     />
    //     <button onClick={() => setIsRecording(true)}>Press</button>
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-evenly",
    //         margin: "25px 25px",
    //         padding: "20px",
    //         border: tries === 1 ? "red solid 1px" : "black solid 1px",
    //       }}
    //     >
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={1}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={0}
    //         cellLetter="P"
    //         // predictedLetter="P"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={1}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={1}
    //         cellLetter="R"
    //         // predictedLetter="R"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={1}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={2}
    //         cellLetter="I"
    //         // predictedLetter="I"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={1}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={3}
    //         cellLetter="M"
    //         // predictedLetter="M"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={1}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={4}
    //         cellLetter="O"
    //         // predictedLetter="O"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //     </div>
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-evenly",
    //         margin: "25px 25px",
    //         padding: "20px",

    //         border: tries === 2 ? "red solid 1px" : "black solid 1px",
    //       }}
    //     >
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={2}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={0}
    //         cellLetter="P"
    //         // predictedLetter="P"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={2}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={1}
    //         cellLetter="R"
    //         // predictedLetter="R"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={2}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={2}
    //         cellLetter="I"
    //         // predictedLetter="I"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={2}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={3}
    //         cellLetter="M"
    //         // predictedLetter="M"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //       <Cell
    //         presentCell={presentCell}
    //         setPresentCell={setPresentCell}
    //         try={2}
    //         setTry={setTries}
    //         presentTry={tries}
    //         cellNumber={4}
    //         cellLetter="O"
    //         // predictedLetter="O"
    //         predictions={predictions}
    //         setPredictions={setPredictions}
    //         word={word}
    //         predictedResults={rowAnswer}
    //         isRecording={isRecording}
    //         isCheck={isCheck}
    //         isClear={isClear}
    //         setIsClear={setIsClear}
    //         answerHandler={answerHandler}
    //       />
    //     </div>
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-evenly",
    //         margin: "25px 25px",
    //         padding: "20px",
    //       }}
    //     >
    //       <div>
    //         <p>Tries: {tries}/5</p>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-evenly",
    //           margin: "25px 0px",
    //         }}
    //       >
    //         <button>Quit</button>
    //         <button>Clear</button>
    //         <button onClick={checkAnswer}>Check</button>
    //       </div>
    //     </div>
    //   </>
  );
};

export default Test;
