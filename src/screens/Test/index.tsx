import React, { useEffect, useState } from "react";

// Components
import Prediction from "../../components/Prediction";
import Cell from "../../components/Cell";

// Model
import { ModelAnswer } from "../../Model";

// TODO: Remove screen after testing
const Test = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState("");
  const [predictions, setPredictions] = useState([""]);
  const [presentCell, setPresentCell] = useState(0);
  const [word, setWord] = useState("PRIMO");
  const [isCheck, setIsCheck] = useState(false);
  const [tries, setTries] = useState(1);
  const [answer, setAnswer] = useState({});
  const [rowAnswer, setRowAnswer] = useState({});

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
    setRowAnswer((rowAns) => ({ ...rowAns, [tries]: answer }));
  }, [answer]);

  const answerHandler = (event: ModelAnswer) => {
    setAnswer((ans) => ({
      ...ans,
      [event.cellNumber]: { value: event.value, guess: event.guess },
    }));
  };

  const checkAnswer = () => {
    if (presentCell === 5) {
      setIsCheck(true);
      //   check word exist
      //   add to answer array
      //   tries ++. NOTE: Increase only if answer not right
      //   reset present cell to 0
    } else {
      setIsCheck(false);
      alert("Input all 5 letters!");
    }
  };

  return (
    <>
      <Prediction
        isRecording={isRecording}
        predictedLetter={predictedLetter}
        setPredictedLetter={setPredictedLetter}
      />
      <button onClick={() => setIsRecording(true)}>Press</button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "25px 0px",
        }}
      >
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={0}
          cellLetter="P"
          // predictedLetter="P"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
          answerHandler={answerHandler}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={1}
          cellLetter="R"
          // predictedLetter="R"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
          answerHandler={answerHandler}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={2}
          cellLetter="I"
          // predictedLetter="I"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
          answerHandler={answerHandler}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={3}
          cellLetter="M"
          // predictedLetter="M"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
          answerHandler={answerHandler}
        />
        <Cell
          presentCell={presentCell}
          setPresentCell={setPresentCell}
          cellNumber={4}
          cellLetter="O"
          // predictedLetter="O"
          predictions={predictions}
          setPredictions={setPredictions}
          word={word}
          isRecording={isRecording}
          isCheck={isCheck}
          answerHandler={answerHandler}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "25px 0px",
        }}
      >
        <div>
          <p>Tries: {tries}/5</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "25px 0px",
          }}
        >
          <button>Quit</button>
          <button>Clear</button>
          <button onClick={checkAnswer}>Check</button>
        </div>
      </div>
    </>
  );
};

export default Test;
